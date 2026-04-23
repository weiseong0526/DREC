import Link from "next/link";
import { KpiCard } from "@/components/KpiCard";
import { StatusPill } from "@/components/StatusPill";
import { ADMIN_THREADS, APPOINTMENTS, PATIENTS } from "@/lib/mock-data";

export default function AdminDashboard() {
  const pending = ADMIN_THREADS.filter((t) => t.aiDraft?.status === "pending");
  const urgent = pending.filter((t) => t.urgent);
  const todayAppts = APPOINTMENTS.filter(
    (a) => new Date(a.scheduledAt).toDateString() === new Date("2026-04-23").toDateString()
  );
  const risk = PATIENTS.filter((p) => p.status === "risk");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Good morning, Dr. Chang 早安</h1>
          <p className="text-sm text-muted">
            {new Date("2026-04-23").toLocaleDateString("en-GB", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            {" · "}
            {PATIENTS.filter((p) => p.status === "active").length} active · {pending.length} drafts pending
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/chat-approval" className="drec-btn-primary">
            Open Chat Approval →
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Active patients" value={PATIENTS.filter((p) => p.status === "active").length} sub="Day 1–100" tone="ok" />
        <KpiCard label="Drafts pending" value={pending.length} sub="Awaiting your approval" tone={pending.length > 0 ? "warn" : "ok"} />
        <KpiCard label="🚨 Urgent" value={urgent.length} sub="Hypo / emergency" tone={urgent.length > 0 ? "bad" : "ok"} />
        <KpiCard label="Today's consults" value={todayAppts.length} sub="Zoom sessions" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="drec-card">
          <h2 className="mb-3 font-semibold">Pending your approval</h2>
          <ul className="space-y-2">
            {pending.slice(0, 5).map((t) => {
              const p = PATIENTS.find((x) => x.id === t.patientId);
              if (!p) return null;
              return (
                <li key={t.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <div>
                    <div className="text-sm font-semibold">
                      {t.urgent && <span className="mr-1 text-state-bad">🚨</span>}
                      {p.name} <span className="text-xs text-muted">· Day {p.currentDay}</span>
                    </div>
                    <div className="line-clamp-1 text-xs text-muted">{t.preview}</div>
                  </div>
                  <Link className="drec-btn" href="/admin/chat-approval">
                    Review
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="drec-card">
          <h2 className="mb-3 font-semibold">At-risk patients</h2>
          {risk.length === 0 ? (
            <div className="text-sm text-muted">No patients flagged.</div>
          ) : (
            <ul className="space-y-2">
              {risk.map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-muted">
                      Day {p.currentDay} · Dietitian {p.assignedDietitian} · HbA1c {p.hba1cCurrent}%
                    </div>
                  </div>
                  <StatusPill value={p.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
