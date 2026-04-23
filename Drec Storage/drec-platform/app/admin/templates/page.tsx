const TEMPLATES = [
  { code: "R1", name: "Welcome & Day-1 greeting", trigger: "Day 1 · 08:00", autoSend: false },
  { code: "R2", name: "Day-3 logging nudge", trigger: "Day 3 · 09:00 if no log", autoSend: false },
  { code: "R3", name: "Day-7 first-week check-in", trigger: "Day 7 · 08:00", autoSend: true },
  { code: "R4", name: "Appointment T-24h reminder", trigger: "24h before appt", autoSend: true },
  { code: "R5", name: "Appointment T-1h reminder", trigger: "1h before appt", autoSend: true },
  { code: "R6", name: "Stage transition message", trigger: "Stage change", autoSend: true },
  { code: "R7", name: "Missed-log nudge", trigger: "No log 48h", autoSend: false },
  { code: "R8", name: "Weekly compliance summary", trigger: "Every Sunday · 20:00", autoSend: true },
  { code: "R9", name: "HbA1c re-test reminder", trigger: "Day 80 · 09:00", autoSend: true },
  { code: "R10", name: "Graduation congratulations", trigger: "Day 100", autoSend: true },
  { code: "R11", name: "Re-enrolment prompt", trigger: "Day 108", autoSend: false },
];

export default function AdminTemplates() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Auto Follow-up Templates · 自动模板</h1>
        <p className="text-sm text-muted">
          11 scheduled-message templates. Toggle auto-send per template; otherwise they queue for
          review.
        </p>
      </div>
      <section className="drec-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg/50 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Trigger</th>
              <th className="px-4 py-3 text-left">Auto-send</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {TEMPLATES.map((t) => (
              <tr key={t.code} className="border-b border-line last:border-0 hover:bg-bg/60">
                <td className="px-4 py-3 font-mono font-bold text-brand-deep">{t.code}</td>
                <td className="px-4 py-3">{t.name}</td>
                <td className="px-4 py-3 text-xs text-muted">{t.trigger}</td>
                <td className="px-4 py-3">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" defaultChecked={t.autoSend} />
                    <span className="text-xs">{t.autoSend ? "On" : "Manual"}</span>
                  </label>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="drec-btn">Edit copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
