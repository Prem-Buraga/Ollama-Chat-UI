import { Conversation } from "@/app/page";
import { useState } from "react";
import clsx from "clsx";

export default function Sidebar(props: {
  models: string[];
  conversations: Conversation[];
  activeId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onChangeModel: (id: string, model: string) => void;
}) {
  const {
    models, conversations, activeId,
    onNew, onSelect, onDelete, onRename, onChangeModel
  } = props;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [titleDraft, setTitleDraft] = useState("");

  return (
    <aside className="h-full bg-panel border-r border-border flex flex-col">
      <div className="p-3 border-b border-border">
        <button
          onClick={onNew}
          className="w-full py-2 rounded-2xl bg-accent text-black font-medium hover:opacity-90"
        >
          + New Chat
        </button>
      </div>
      <div className="p-3 border-b border-border">
        <div className="text-sm text-subtext mb-1">Available Models</div>
        <div className="max-h-24 overflow-y-auto scrollbar-thin text-sm text-subtext">
          {models.length === 0 ? (
            <div className="text-xs">No models detected. Ensure Ollama is running.</div>
          ) : (
            <ul className="list-disc pl-5">
              {models.map(m => <li key={m} className="truncate">{m}</li>)}
            </ul>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
        {conversations.map(c => {
          const active = c.id === activeId;
          return (
            <div
              key={c.id}
              className={clsx(
                "rounded-xl border border-border hover:bg-[#1b1e25] cursor-pointer group"
              )}
              onClick={() => onSelect(c.id)}
            >
              <div className={clsx(
                "px-3 py-2 flex items-center justify-between",
                active && "bg-[#1b1e25] rounded-xl"
              )}>
                <div className="w-[70%]">
                  {editingId === c.id ? (
                    <input
                      className="w-full bg-transparent outline-none border-b border-border"
                      value={titleDraft}
                      onChange={(e) => setTitleDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onRename(c.id, titleDraft.trim() || "Untitled");
                          setEditingId(null);
                        } else if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <div className="truncate">{c.title}</div>
                  )}
                  <div className="text-xs text-subtext truncate">{c.model}</div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    className="text-xs text-subtext hover:text-text"
                    onClick={(e) => { e.stopPropagation(); setEditingId(c.id); setTitleDraft(c.title); }}
                    title="Rename"
                  >
                    ✎
                  </button>
                  <button
                    className="text-xs text-subtext hover:text-text"
                    onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <div className="px-3 pb-2">
                <select
                  className="w-full bg-[#0b0d12] border border-border rounded-lg px-2 py-1 text-sm"
                  value={c.model}
                  onChange={(e) => onChangeModel(c.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {[c.model, ...models.filter(m => m !== c.model)].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
        {conversations.length === 0 && (
          <div className="text-sm text-subtext px-2">
            No chats yet. Click <span className="text-text">New Chat</span> to start.
          </div>
        )}
      </div>
      <div className="p-3 text-xs text-subtext border-t border-border">
        Local Ollama · Streaming · Markdown & Code ✓
      </div>
    </aside>
  );
}
