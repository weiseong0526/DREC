import Link from "next/link";
import { DayProgress } from "@/components/DayProgress";
import { KpiCard } from "@/components/KpiCard";
import { StatusPill } from "@/components/StatusPill";
import { APPOINTMENTS, GLUCOSE_LOGS, PATIENTS, RESOURCES } from "@/lib/mock-data";

const STAGE_LABEL: Record<number, string> = {
  1: "Stage 1 · 排糖期 Elimination",
  2: "Stage 2 · 排油期 Fat mobilisation",
  3: "Stage 3 · 排毒期 Detox",
  4: "Stage 4 · 固醇期 Stabilise",
  5: "Stage 5 · 保护期 Nurture",
};

export default function PatientHome() {
  const me = PATIENTS[0];
  const nextAppt = APPOINTMENTS.find((a) => a.patientId === me.id && a.status === "scheduled");
  const latestFbs = GLUCOSE_LOGS.filter((g) => g.patientId === me.id && g.type === "fbs").at(-1);
  const todayResources = RESOURCES.filter((r) => r.stage <= me.stage).slice(0, 3);

  return (
    <div className="space-y-5">
      {me.programState !== "active" && (
        <div
          className={`drec-card ${
            me.programState === "grace"
              ? "border-hl-bd bg-hl"
              : "border-[#FFCDD2] bg-[#FFEBEE]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{me.programState === "grace" ? "⏳" : "⛔"}</span>
            <div>
              <div className="font-bold">
                {me.programState === "grace"
                  ? "Grace period · 宽限期"
                  : "Program expired · 已过期"}
              </div>
              <div className="text-sm text-muted">
                {me.programState === "grace"
                  ? "Day 101–114. Most features remain open — chat with your dietitian about renewal."
                  : "Day 115+. Re-enroll to regain full access."}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="drec-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Good morning, {me.name.split(" ")[0]} 早安
            </div>
            <h1 className="text-2xl font-bold">Welcome back to your 100-day journey</h1>
            <div className="mt-1 text-sm text-muted">{STAGE_LABEL[me.stage]}</div>
          </div>
          <StatusPill value={me.programState} label={`Program: ${me.programState}`} />
        </div>
        <div className="mt-5">
          <DayProgress day={me.currentDay} />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard
          label="Fasting glucose"
          value={latestFbs ? `${latestFbs.readingMmolL.toFixed(1)} mmol/L` : "—"}
          sub={latestFbs ? new Date(latestFbs.loggedAt).toLocaleString() : "Log your first reading"}
          tone={
            latestFbs && latestFbs.readingMmolL >= 4 && latestFbs.readingMmolL <= 7 ? "ok" : "warn"
          }
        />
        <KpiCard
          label="Weight"
          value={`${me.weightKg?.toFixed(1) ?? "—"} kg`}
          sub="Waist 94 cm · updated this week"
        />
        <KpiCard
          label="HbA1c"
          value={`${me.hba1cCurrent ?? "—"}%`}
          sub={`Baseline ${me.hba1cBaseline ?? "—"}% · Day 1`}
          tone={me.hba1cCurrent && me.hba1cCurrent < 7 ? "ok" : "warn"}
        />
        <KpiCard
          label="Next learning"
          value={todayResources[0]?.title ?? "No new content"}
          sub={todayResources[0]?.titleCn ?? ""}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="drec-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Next appointment · 下次预约</h2>
            <Link href="/patient/appointments" className="text-xs font-semibold text-brand">
              View all →
            </Link>
          </div>
          {nextAppt ? (
            <div className="space-y-2">
              <div className="text-sm text-muted">Appointment #{nextAppt.apptNumber} of 4</div>
              <div className="text-xl font-bold">
                {new Date(nextAppt.scheduledAt).toLocaleString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex gap-2 pt-2">
                <button className="drec-btn-primary">Join Zoom</button>
                <button className="drec-btn">Reschedule</button>
              </div>
              <div className="pt-1 text-xs text-muted">
                Slides are released by your dietitian after the consult.
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted">No upcoming appointment.</div>
          )}
        </section>

        <section className="drec-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Today's learning · 今日学习</h2>
            <Link href="/patient/resources" className="text-xs font-semibold text-brand">
              Library →
            </Link>
          </div>
          <ul className="space-y-2">
            {todayResources.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                <div>
                  <div className="text-sm font-semibold">{r.title}</div>
                  <div className="text-xs text-muted">{r.titleCn}</div>
                </div>
                <span className="drec-chip">{r.kind}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="drec-card">
        <h2 className="mb-3 font-semibold">Quick actions · 快速操作</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            ["📉", "Log glucose", "fasting · 2hPP · random"],
            ["🍱", "Meal photo", "AI tags + carb estimate"],
            ["⚖️", "Weight / waist", "weekly check-in"],
            ["🎤", "Voice note", "auto-transcribed"],
          ].map(([icon, title, sub]) => (
            <button
              key={title}
              className="rounded-card border border-line bg-card p-4 text-left transition hover:border-brand hover:shadow-pop"
            >
              <div className="text-2xl">{icon}</div>
              <div className="mt-1 text-sm font-semibold">{title}</div>
              <div className="text-xs text-muted">{sub}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
