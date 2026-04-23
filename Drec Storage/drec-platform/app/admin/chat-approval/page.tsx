"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChatBubble } from "@/components/ChatBubble";
import { StatusPill } from "@/components/StatusPill";
import { ADMIN_THREADS, PATIENTS, getPatient } from "@/lib/mock-data";
import type { AdminThread } from "@/lib/types";

export default function ChatApproval() {
  const [threads, setThreads] = useState<AdminThread[]>(ADMIN_THREADS);
  const [selectedId, setSelectedId] = useState<string>(threads[0]?.id ?? "");
  const [edit, setEdit] = useState("");
  const selected = threads.find((t) => t.id === selectedId);

  useEffect(() => {
    setEdit(selected?.aiDraft?.draftText ?? "");
  }, [selectedId, selected?.aiDraft?.draftText]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selected?.aiDraft || selected.aiDraft.status !== "pending") return;
      const k = e.key.toLowerCase();
      if (k === "a") approve(selected.id, edit, false);
      if (k === "e") (document.getElementById("draft-textarea") as HTMLTextAreaElement)?.focus();
      if (k === "r") reject(selected.id);
      if (k === "j") move(1);
      if (k === "k") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, edit]);

  function move(delta: number) {
    const i = threads.findIndex((t) => t.id === selectedId);
    const next = threads[(i + delta + threads.length) % threads.length];
    if (next) setSelectedId(next.id);
  }

  function approve(id: string, text: string, edited: boolean) {
    setThreads((ts) =>
      ts.map((t) =>
        t.id === id && t.aiDraft
          ? {
              ...t,
              aiDraft: { ...t.aiDraft, status: edited ? "edited" : "approved", draftText: text, approvedAt: new Date().toISOString() },
            }
          : t
      )
    );
  }
  function reject(id: string) {
    setThreads((ts) =>
      ts.map((t) =>
        t.id === id && t.aiDraft ? { ...t, aiDraft: { ...t.aiDraft, status: "rejected" } } : t
      )
    );
  }

  return (
    <div className="grid h-[calc(100vh-200px)] grid-cols-[280px,1fr,320px] gap-4">
      {/* Threads list */}
      <aside className="drec-card overflow-y-auto p-0">
        <div className="sticky top-0 border-b border-line bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Chat Approval Queue
          </div>
          <div className="text-lg font-bold">
            {threads.filter((t) => t.aiDraft?.status === "pending").length} pending
          </div>
          <div className="mt-1 text-[11px] text-muted">
            Shortcuts: <kbd className="rounded bg-chip px-1">A</kbd> approve · <kbd className="rounded bg-chip px-1">E</kbd> edit ·{" "}
            <kbd className="rounded bg-chip px-1">R</kbd> reject · <kbd className="rounded bg-chip px-1">J/K</kbd> next/prev
          </div>
        </div>
        <ul>
          {threads.map((t) => {
            const p = getPatient(t.patientId);
            const active = t.id === selectedId;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setSelectedId(t.id)}
                  className={clsx(
                    "block w-full border-b border-line px-3 py-3 text-left hover:bg-bg/70",
                    active && "bg-chip/60"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">
                      {t.urgent && <span className="mr-1 text-state-bad">🚨</span>}
                      {p?.name}
                    </div>
                    <span className="drec-chip">{p?.assignedDietitian}</span>
                  </div>
                  <div className="line-clamp-2 text-xs text-muted">{t.preview}</div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted">
                    <span>Day {p?.currentDay}</span>
                    {t.aiDraft && (
                      <span
                        className={clsx(
                          "drec-pill border-0 px-1.5 py-0 text-[10px]",
                          t.aiDraft.status === "pending" && "bg-hl text-[#8A6200]",
                          t.aiDraft.status === "approved" && "bg-[#E8F6EE] text-[#2E7D32]",
                          t.aiDraft.status === "edited" && "bg-chip text-brand-deep",
                          t.aiDraft.status === "rejected" && "bg-[#FFEBEE] text-state-bad"
                        )}
                      >
                        {t.aiDraft.status}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Conversation + draft */}
      <section className="drec-card flex flex-col p-0">
        {selected ? (
          <>
            <div className="border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{getPatient(selected.patientId)?.name}</span>
                <StatusPill value={getPatient(selected.patientId)?.status ?? "active"} />
                {selected.urgent && (
                  <span className="drec-pill bg-[#FFEBEE] text-state-bad">🚨 Urgent</span>
                )}
              </div>
              <div className="text-xs text-muted">
                Thread {selected.id} · WhatsApp Business · 24h session window
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto bg-bg p-4">
              {selected.messages.map((m) => (
                <ChatBubble key={m.id} msg={m} />
              ))}
            </div>

            {selected.aiDraft && (
              <div className="border-t border-line bg-hl/40 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="drec-chip bg-brand/15 text-brand-deep">
                    🤖 AI draft · {selected.aiDraft.modelVersion}
                  </span>
                  <span className="text-xs text-muted">
                    confidence {(selected.aiDraft.confidence * 100).toFixed(0)}% · prompt{" "}
                    {selected.aiDraft.promptVersion}
                  </span>
                  <span className="flex-1" />
                  <StatusPill value={selected.aiDraft.status} />
                </div>
                <textarea
                  id="draft-textarea"
                  className="drec-input min-h-[90px]"
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  disabled={selected.aiDraft.status !== "pending"}
                />
                <div className="mt-1 text-xs italic text-muted">
                  <b>Reasoning:</b> {selected.aiDraft.reasoning}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="drec-btn-accent"
                    disabled={selected.aiDraft.status !== "pending"}
                    onClick={() =>
                      approve(selected.id, edit, edit !== selected.aiDraft!.draftText)
                    }
                  >
                    ✓ Approve & Send (A)
                  </button>
                  <button
                    className="drec-btn"
                    disabled={selected.aiDraft.status !== "pending"}
                    onClick={() => setEdit(selected.aiDraft!.draftText)}
                  >
                    Reset
                  </button>
                  <button
                    className="drec-btn border-state-bad text-state-bad"
                    disabled={selected.aiDraft.status !== "pending"}
                    onClick={() => reject(selected.id)}
                  >
                    ✕ Reject (R)
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid h-full place-items-center text-muted">No thread selected.</div>
        )}
      </section>

      {/* Patient summary */}
      <aside className="drec-card overflow-y-auto">
        {selected && (() => {
          const p = getPatient(selected.patientId);
          if (!p) return null;
          return (
            <div>
              <div className="mb-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Patient summary
                </div>
                <div className="text-lg font-bold">{p.name}</div>
                <div className="text-xs text-muted">
                  {p.enrollmentId} · Day {p.currentDay}/100 · Stage {p.stage}
                </div>
              </div>
              <dl className="grid grid-cols-[100px,1fr] gap-y-2 text-xs">
                <dt className="text-muted">Dietitian</dt>
                <dd>{p.assignedDietitian}</dd>
                <dt className="text-muted">Phone</dt>
                <dd>{p.phone}</dd>
                <dt className="text-muted">HbA1c</dt>
                <dd>
                  {p.hba1cCurrent}% (from {p.hba1cBaseline}%)
                </dd>
                <dt className="text-muted">Weight</dt>
                <dd>{p.weightKg} kg</dd>
                <dt className="text-muted">Waist</dt>
                <dd>{p.waistCm} cm</dd>
                <dt className="text-muted">Payment</dt>
                <dd>
                  <StatusPill value={p.paymentStatus} />
                </dd>
                <dt className="text-muted">Program</dt>
                <dd>
                  <StatusPill value={p.programState} />
                </dd>
              </dl>
              <div className="mt-4 border-t border-line pt-3">
                <div className="mb-2 text-xs font-semibold uppercase text-muted">Recent logs</div>
                <ul className="space-y-1 text-xs">
                  <li>FBS 5.6 mmol/L — today 07:15</li>
                  <li>FBS 7.1 (2hPP) — yesterday 14:10</li>
                  <li>Meal: grilled chicken + salad</li>
                </ul>
              </div>
              <div className="mt-4 border-t border-line pt-3">
                <div className="mb-2 text-xs font-semibold uppercase text-muted">
                  Policy boundaries
                </div>
                <ul className="space-y-1 text-xs text-muted">
                  <li>• Medication step-downs → Dr. Eason only</li>
                  <li>• Emergency auto-send (AI-11) for hypo/hyper</li>
                  <li>• Marketing never shared without explicit consent</li>
                </ul>
              </div>
            </div>
          );
        })()}
      </aside>
    </div>
  );
}
