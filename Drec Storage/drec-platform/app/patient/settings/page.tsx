import { PATIENTS } from "@/lib/mock-data";

export default function PatientSettings() {
  const me = PATIENTS[0];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings · 设置</h1>

      <section className="drec-card">
        <h2 className="mb-3 font-semibold">Language & region</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="drec-label">Language</span>
            <select className="drec-input" defaultValue="en">
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ms">Bahasa Malaysia</option>
            </select>
          </label>
          <label className="block">
            <span className="drec-label">Timezone</span>
            <select className="drec-input" defaultValue="Asia/Kuala_Lumpur">
              <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (UTC+8)</option>
              <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
            </select>
          </label>
        </div>
      </section>

      <section className="drec-card">
        <h2 className="mb-3 font-semibold">Notifications</h2>
        {[
          ["Appointment reminders", true],
          ["Daily glucose check-in", true],
          ["New learning content", true],
          ["Optional marketing", false],
        ].map(([k, on]) => (
          <label key={String(k)} className="flex items-center justify-between border-b border-line py-2.5 last:border-0">
            <span className="text-sm">{k as string}</span>
            <input type="checkbox" defaultChecked={on as boolean} />
          </label>
        ))}
      </section>

      <section className="drec-card">
        <h2 className="mb-3 font-semibold">Care team & program</h2>
        <dl className="grid grid-cols-[180px,1fr] gap-y-2 text-sm">
          <dt className="text-muted">Assigned dietitian</dt>
          <dd>Dietitian {me.assignedDietitian}</dd>
          <dt className="text-muted">Enrolment ID</dt>
          <dd className="font-mono text-brand-deep">{me.enrollmentId}</dd>
          <dt className="text-muted">Day 1</dt>
          <dd>{new Date(me.day1Date).toLocaleDateString()}</dd>
          <dt className="text-muted">Program state</dt>
          <dd>{me.programState}</dd>
        </dl>
      </section>

      <section className="drec-card">
        <h2 className="mb-3 font-semibold">PDPA · Data rights</h2>
        <p className="text-sm text-muted">
          You can request access (CSV export), correction, or erasure of your data at any time.
          Erasure is applied as a 30-day soft delete, then hard-deleted.
        </p>
        <div className="mt-3 flex gap-2">
          <button className="drec-btn">Export my data</button>
          <button className="drec-btn">Request correction</button>
          <button className="drec-btn border-state-bad text-state-bad">
            Request erasure
          </button>
        </div>
      </section>
    </div>
  );
}
