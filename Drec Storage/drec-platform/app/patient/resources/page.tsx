import { RESOURCES, PATIENTS } from "@/lib/mock-data";

export default function PatientResources() {
  const me = PATIENTS[0];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Learning Resources · 学习资料</h1>
        <p className="text-sm text-muted">
          Content unlocks automatically as you progress through the 5 stages.
        </p>
      </div>

      {[1, 2, 3, 4, 5].map((stage) => {
        const items = RESOURCES.filter((r) => r.stage === stage);
        const unlocked = stage <= me.stage;
        if (items.length === 0) return null;
        return (
          <section key={stage} className="drec-card">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Stage {stage}
                </div>
                <h2 className="font-semibold">
                  {["排糖期", "排油期", "排毒期", "固醇期", "保护期"][stage - 1]}
                </h2>
              </div>
              {!unlocked && <span className="drec-pill bg-chip text-muted">🔒 Locked</span>}
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {items.map((r) => (
                <li
                  key={r.id}
                  className={`rounded-card border border-line p-4 ${
                    unlocked ? "hover:border-brand hover:shadow-card" : "opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="drec-chip">{r.kind.toUpperCase()}</span>
                    <span className="text-xs text-muted">Released · Day {r.releasedDay}</span>
                  </div>
                  <div className="mt-2 font-semibold">{r.title}</div>
                  <div className="text-sm text-muted">{r.titleCn}</div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
