import { APPOINTMENTS, PATIENTS } from "@/lib/mock-data";
import { StatusPill } from "@/components/StatusPill";

export default function AdminAppts() {
  const rows = APPOINTMENTS.map((a) => ({
    a,
    p: PATIENTS.find((x) => x.id === a.patientId)!,
  }));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Appointments · 预约</h1>
          <p className="text-sm text-muted">
            Appointment slides auto-generate 24h before each consult and are hidden from the patient
            until you release them post-consult.
          </p>
        </div>
        <button className="drec-btn-primary">+ New appointment</button>
      </div>

      <section className="drec-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg/50 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">When</th>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">Dietitian</th>
              <th className="px-4 py-3 text-left">Appt #</th>
              <th className="px-4 py-3 text-left">Slide</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ a, p }) => (
              <tr key={a.id} className="border-b border-line last:border-0 hover:bg-bg/60">
                <td className="px-4 py-3">
                  {new Date(a.scheduledAt).toLocaleString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted">{p.enrollmentId}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="drec-chip">{p.assignedDietitian}</span>
                </td>
                <td className="px-4 py-3 font-semibold">#{a.apptNumber}/4</td>
                <td className="px-4 py-3 text-xs">
                  {a.slideReleased ? (
                    <span className="drec-pill bg-[#E8F6EE] text-[#2E7D32]">Released</span>
                  ) : (
                    <span className="drec-pill bg-hl text-[#8A6200]">Held</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusPill value={a.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="drec-btn mr-1">Prebrief</button>
                  {!a.slideReleased && <button className="drec-btn-accent">Release slide</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
