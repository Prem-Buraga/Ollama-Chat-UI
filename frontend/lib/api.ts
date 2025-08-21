import type { Message } from "@/app/page";

const BASE = "http://127.0.0.1:8000";

export type StreamCallbacks = {
  onToken: (t: string) => void;
  onDone: () => void;
  onError?: (err: string) => void;
};

export async function streamChat(
  model: string,
  messages: Message[],
  cb: StreamCallbacks
) {
  const url = `${BASE}/chat/stream`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages }),
  });

  if (!resp.ok || !resp.body) {
    cb.onError?.(`HTTP ${resp.status}`);
    return;
  }

  // Handle SSE manually via reader
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const processBuffer = () => {
    const parts = buffer.split("\n\n");
    buffer = parts.pop() || "";
    for (const part of parts) {
      if (part.startsWith("data:")) {
        try {
          const jsonStr = part.replace(/^data:\s*/, "");
          const obj = JSON.parse(jsonStr);
          if (obj.token) cb.onToken(obj.token);
          if (obj.done) cb.onDone();
        } catch {}
      } else if (part.startsWith("event: error")) {
        const line = part.split("\n").find(l => l.startsWith("data:"));
        if (line) {
          const err = JSON.parse(line.replace("data: ", ""));
          cb.onError?.(err.error || "stream error");
        }
      }
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    processBuffer();
  }
  // flush
  if (buffer) processBuffer();
}
