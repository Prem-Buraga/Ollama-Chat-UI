"use client";

import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import { useEffect, useState } from "react";

export type Message = { role: "system" | "user" | "assistant"; content: string };
export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: number;
};

export default function Page() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [defaultModel, setDefaultModel] = useState("gemma3");

  // Load convos from localStorage
  useEffect(() => {
    const data = localStorage.getItem("conversations");
    if (data) {
      const parsed: Conversation[] = JSON.parse(data);
      setConversations(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/models")
      .then(res => res.json())
      .then(d => {
        setModels(d.models || []);
        if (d.default) setDefaultModel(d.default);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  const createConversation = (model?: string) => {
    const id = crypto.randomUUID();
    const conv: Conversation = {
      id,
      title: "New Chat",
      messages: [],
      model: model || defaultModel,
      createdAt: Date.now(),
    };
    setConversations(prev => [conv, ...prev]);
    setActiveId(id);
  };

  const updateConversation = (id: string, updater: (c: Conversation) => Conversation) => {
    setConversations(prev => prev.map(c => (c.id === id ? updater(c) : c)));
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeId === id) {
      const remaining = conversations.filter(c => c.id !== id);
      setActiveId(remaining[0]?.id ?? null);
    }
  };

  const active = conversations.find(c => c.id === activeId) || null;

  return (
    <div className="h-full grid grid-cols-[300px_1fr]">
      <Sidebar
        models={models}
        conversations={conversations}
        activeId={activeId}
        onNew={() => createConversation()}
        onSelect={(id) => setActiveId(id)}
        onDelete={deleteConversation}
        onRename={(id, title) => updateConversation(id, c => ({ ...c, title }))}
        onChangeModel={(id, model) => updateConversation(id, c => ({ ...c, model }))}
      />
      <Chat
        key={active?.id || "empty"}
        conversation={active}
        onUpdate={(conv) => updateConversation(conv.id, () => conv)}
        onCreate={() => createConversation()}
        models={models}
      />
    </div>
  );
}
