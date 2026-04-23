import { KpiCard } from "@/components/KpiCard";
import { PATIENTS } from "@/lib/mock-data";

export default function AdminProgress() {
  const active = PATIENTS.filter((p) => p.status === "active");
  const avgDrop =
    active.reduce(
      (sum, p) => sum + ((p.hba1cBaseline ?? 0) - (p.hba1cCurrent ?? p.hba1cBaseline ?? 0)),
      0
    ) / Math.max(1, active.length);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Progress Dashboard · 进展总览</h1>
        <p className="text-sm text-muted">
          Cohort-level outcomes. Target: ≥1.5% HbA1c drop by Day 100.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Avg HbA1c drop" value={`${avgDrop.toFixed(2)}%`} tone="ok" sub="Cohort, all active" />
        <KpiCard label="Draft approval rate" value="63%" sub="No-edit · target ≥60%" tone="ok" />
        <KpiCard label="Time-to-approve" value="3m 24s" sub="p50 · target <4m" tone="ok" />
        <KpiCard label="Graduated" value={PATIENTS.filter((p) => p.status === "graduated").length} sub="Day 100 complete" />
      </div>

      <section className="drec-card p-0 overflow-hidden">
        <div className="border-b border-line bg-bg/50 px-4 py-3 text-xs font-semibold uppercase text-muted">
          Diet performance · by dietitian
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-line text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Dietitian</th>
              <th className="px-4 py-3 text-left">Active</th>
              <th className="px-4 py-3 text-left">Avg HbA1c drop</th>
              <th className="px-4 py-3 text-left">Compliance</th>
              <th className="px-4 py-3 text-left">Draft edits</th>
            </tr>
          </thead>
          <tbody>
            {["SS", "Jen", "CY"].map((d) => {
              const count = PATIENTS.filter((p) => p.assignedDietitian === d && p.status === "active").length;
              return (
                <tr key={d} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <span className="drec-chip">{d}</span>
                  </td>
                  <td className="px-4 py-3">{count}</td>
                  <td className="px-4 py-3 text-state-ok font-semibold">
                    {(1.8 + Math.random() * 0.4).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3">{85 + Math.floor(Math.random() * 10)}%</td>
                  <td className="px-4 py-3">{20 + Math.floor(Math.random() * 10)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
