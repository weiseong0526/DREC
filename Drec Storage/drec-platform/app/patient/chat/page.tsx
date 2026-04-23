"use client";
import { useState } from "react";
import { ChatBubble } from "@/components/ChatBubble";
import { ADMIN_THREADS, PATIENTS } from "@/lib/mock-data";
import type { ChatMessage } from "@/lib/types";

export default function PatientChat() {
  const me = PATIENTS[0];
  const mine = ADMIN_THREADS.find((t) => t.patientId === me.id);
  const seed: ChatMessage[] = mine?.messages ?? [
    {
      id: "w1",
      patientId: me.id,
      sender: "dietitian",
      text: "Hi Wei Ming, today is Day 72 — keep it up 💪",
      timestamp: "2026-04-23T07:00:00+08:00",
      readByAdmin: true,
    },
  ];
  const [messages, setMessages] = useState<ChatMessage[]>(seed);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `m_${Date.now()}`,
        patientId: me.id,
        sender: "patient",
        text: draft,
        timestamp: new Date().toISOString(),
        readByAdmin: false,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="drec-card flex h-[calc(100vh-200px)] flex-col p-0">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <div className="font-semibold">Dietitian SS · 你的营养师</div>
          <div className="text-xs text-muted">
            Usually replies within 2 hours · via WhatsApp Business
          </div>
        </div>
        <span className="drec-chip">🟢 Online</span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto bg-bg p-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} />
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-3 py-2">
        <button className="drec-btn" aria-label="Upload photo">
          📷
        </button>
        <button className="drec-btn" aria-label="Voice message">
          🎤
        </button>
        <input
          className="drec-input"
          placeholder="Type a message · 输入信息"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="drec-btn-primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
