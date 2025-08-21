from typing import Any, Dict, List, Optional
import json
import os
import asyncio

import httpx
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel, Field

# -----------------------------
# Configuration
# -----------------------------
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "gemma3")  # Set your default model tag here
ALLOW_ORIGINS = os.getenv("ALLOW_ORIGINS", "*").split(",")  # adjust for prod

app = FastAPI(title="Ollama Proxy API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request/Response Models
# -----------------------------
class ChatMessage(BaseModel):
    role: str  # "system" | "user" | "assistant"
    content: str

class ChatRequest(BaseModel):
    model: str = Field(default=DEFAULT_MODEL)
    messages: List[ChatMessage]
    # optional advanced params
    temperature: Optional[float] = None
    top_p: Optional[float] = None
    top_k: Optional[int] = None
    max_tokens: Optional[int] = Field(default=None, description="max tokens to generate")
    stop: Optional[List[str]] = None

# -----------------------------
# Utilities
# -----------------------------
def _ollama_chat_payload(req: ChatRequest, stream: bool = True) -> Dict[str, Any]:
    payload: Dict[str, Any] = {
        "model": req.model,
        "messages": [m.model_dump() for m in req.messages],
        "stream": stream,
    }
    if req.temperature is not None:
        payload["options"] = payload.get("options", {})
        payload["options"]["temperature"] = req.temperature
    if req.top_p is not None:
        payload.setdefault("options", {})["top_p"] = req.top_p
    if req.top_k is not None:
        payload.setdefault("options", {})["top_k"] = req.top_k
    if req.max_tokens is not None:
        payload.setdefault("options", {})["num_predict"] = req.max_tokens
    if req.stop:
        payload.setdefault("options", {})["stop"] = req.stop
    return payload

# -----------------------------
# Routes
# -----------------------------

@app.get("/health")
async def health():
    # Check connectivity to Ollama
    try:
        async with httpx.AsyncClient(timeout=2.0) as client:
            r = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            r.raise_for_status()
        return {"ok": True}
    except Exception as e:
        return JSONResponse(status_code=500, content={"ok": False, "error": str(e)})

@app.get("/models")
async def list_models():
    """
    Returns locally available models (ollama tags).
    """
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        data = resp.json()
        # normalize: [{"name": "gemma3:latest", ...}, ...]
        models = [m.get("name") for m in data.get("models", []) if m.get("name")]
        return {"models": models, "default": DEFAULT_MODEL}

@app.post("/chat")
async def chat(req: ChatRequest):
    """
    Non-streaming chat (returns full assistant message).
    """
    payload = _ollama_chat_payload(req, stream=False)
    async with httpx.AsyncClient(timeout=None) as client:
        resp = await client.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        data = resp.json()
        # Ollama returns: {"message": {"role":"assistant","content":"..."}, "done":true, ...}
        message = data.get("message", {}).get("content", "")
        return {"content": message}

@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    """
    Streaming chat via Server-Sent Events (SSE): data: {"token": "..."}\n\n
    The frontend accumulates tokens to display a streaming response.
    """
    payload = _ollama_chat_payload(req, stream=True)

    async def event_generator():
        # Using SSE with lines formatted as 'data: <json>\n\n'
        try:
            async with httpx.AsyncClient(timeout=None) as client:
                async with client.stream("POST", f"{OLLAMA_BASE_URL}/api/chat", json=payload) as r:
                    async for line in r.aiter_lines():
                        if not line:
                            continue
                        # Ollama stream is JSON lines
                        try:
                            obj = json.loads(line)
                        except json.JSONDecodeError:
                            # In case line is prefixed/suffixed unexpectedly
                            continue
                        if "message" in obj and "content" in obj["message"]:
                            token = obj["message"]["content"]
                            yield f"data: {json.dumps({'token': token})}\n\n"
                        if obj.get("done"):
                            # Optional: include metadata at end
                            yield f"data: {json.dumps({'done': True})}\n\n"
                            break
        except Exception as e:
            # Surface error to client as SSE error event
            yield f"event: error\ndata: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
