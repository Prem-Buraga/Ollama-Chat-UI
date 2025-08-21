import { Conversation, Message } from "@/app/page";
import { useEffect, useMemo, useRef, useState } from "react";
import { streamChat } from "@/lib/api";
import MessageItem from "./MessageItem";

export default function Chat({
  conversation,
  onUpdate,
  onCreate,
  models
}: {
  conversation: Conversation | null;
  onUpdate: (c: Conversation) => void;
  onCreate: () => void;
  models: string[];
}) {
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length, isStreaming]);

  if (!conversation) {
    return (
      <main className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2 font-semibold">Local Chat</div>
          <div className="text-subtext mb-6">Powered by Ollama · Choose a model and start chatting.</div>
          <button
            onClick={onCreate}
            className="px-4 py-2 rounded-2xl bg-accent text-black font-medium hover:opacity-90"
          >
            New Chat
          </button>
        </div>
      </main>
    );
  }

  const send = async () => {
    if (!input.trim() || isStreaming) return;
    const userMsg: Message = { role: "user", content: input.trim() };

    const updated = { ...conversation, messages: [...conversation.messages, userMsg] };
    // Auto title: first 24 chars of first user message
    if (updated.messages.length === 1) {
      updated.title = userMsg.content.slice(0, 24) + (userMsg.content.length > 24 ? "…" : "");
    }
    onUpdate(updated);
    setInput("");
    setIsStreaming(true);

    // Add a placeholder assistant message we will stream into
    const assistantIndex = updated.messages.length;
    const withAssistant = {
      ...updated,
      messages: [...updated.messages, { role: "assistant", content: "" as string }]
    };
    onUpdate(withAssistant);

    await streamChat(
      conversation.model,
      withAssistant.messages.slice(0, assistantIndex), // send conversation up to user message; assistant will be streamed
      {
        onToken: (t) => {
          const cur = withAssistant.messages[assistantIndex].content + t;
          withAssistant.messages[assistantIndex] = { role: "assistant", content: cur };
          onUpdate({ ...withAssistant });
        },
        onDone: () => setIsStreaming(false),
        onError: (err) => {
          setIsStreaming(false);
          const errMsg = `Error: ${err}`;
          withAssistant.messages[assistantIndex].content += `\n\n${errMsg}`;
          onUpdate({ ...withAssistant });
        }
      }
    );
  };

  const stopInfo = useMemo(() => {
    return isStreaming ? "Generating…" : "";
  }, [isStreaming]);

  return (
    <main className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{conversation.title || "Chat"}</div>
          <div className="text-xs text-subtext">{conversation.model}</div>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-xs text-subtext">Model:</label>
          <select
            className="bg-[#0b0d12] border border-border rounded-lg px-2 py-1 text-sm"
            value={conversation.model}
            onChange={(e) => onUpdate({ ...conversation, model: e.target.value })}
          >
            {[conversation.model, ...models.filter(m => m !== conversation.model)].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {conversation.messages.map((m, i) => (
          <MessageItem key={i} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="px-6 pb-4 pt-2 border-t border-border">
        <div className="text-xs text-subtext h-4">{stopInfo}</div>
        <div className="flex items-end gap-2">
          <textarea
            className="input"
            rows={1}
            placeholder="Message… (Shift+Enter for newline)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            className="px-4 py-2 rounded-2xl bg-accent text-black font-medium hover:opacity-90 disabled:opacity-50"
            disabled={isStreaming || !input.trim()}
            onClick={send}
            title="Send"
          >
            ➤
          </button>
        </div>
        <div className="text-[11px] text-subtext mt-2">
          Supports Markdown, code blocks with syntax highlighting, and multi-turn context.
        </div>
      </div>
    </main>
  );
}
