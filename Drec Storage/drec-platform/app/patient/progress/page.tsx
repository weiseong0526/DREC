import { KpiCard } from "@/components/KpiCard";
import { Sparkline } from "@/components/Sparkline";
import { GLUCOSE_LOGS, PATIENTS } from "@/lib/mock-data";

export default function PatientProgress() {
  const me = PATIENTS[0];
  const fbs = GLUCOSE_LOGS.filter((g) => g.patientId === me.id && g.type === "fbs")
    .map((g) => g.readingMmolL)
    .reverse();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">My Progress · 我的进展</h1>
        <p className="text-sm text-muted">Your journey over the last 7 days.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="HbA1c drop" value={`-${(8.9 - 6.7).toFixed(1)}%`} sub="Baseline 8.9 → now 6.7" tone="ok" />
        <KpiCard label="Weight lost" value="-5.8 kg" sub="Since Day 1 (84 → 78.2)" tone="ok" />
        <KpiCard label="Logging streak" value="14 days" sub="Glucose + meals" />
        <KpiCard label="Compliance" value="92%" sub="Resource views + logs" tone="ok" />
      </div>

      <section className="drec-card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold">Fasting glucose · 空腹血糖</h2>
          <span className="text-xs text-muted">Target band 4.0 – 7.0 mmol/L</span>
        </div>
        <Sparkline points={fbs} width={640} height={140} targetBand={[4, 7]} />
      </section>

      <section className="drec-card">
        <h2 className="mb-3 font-semibold">Milestones · 里程碑</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {[
            ["🎯", "HbA1c < 7%", "Reached on Day 54"],
            ["⚖️", "-5 kg", "Reached on Day 38"],
            ["💊", "Off Metformin", "Step-down awaiting Dr. Eason"],
          ].map(([i, t, s]) => (
            <li key={t} className="rounded-card border border-line p-4">
              <div className="text-2xl">{i}</div>
              <div className="mt-1 font-semibold">{t}</div>
              <div className="text-xs text-muted">{s}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
