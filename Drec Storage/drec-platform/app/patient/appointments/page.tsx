import { APPOINTMENTS, PATIENTS } from "@/lib/mock-data";

export default function PatientAppts() {
  const me = PATIENTS[0];
  const mine = APPOINTMENTS.filter((a) => a.patientId === me.id);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Appointments · 预约</h1>
        <p className="text-sm text-muted">
          4 scheduled consultations across your 100-day program. Reschedule requests are approved by
          your dietitian.
        </p>
      </div>

      <section className="drec-card p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-line text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">When</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Slide</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((n) => {
              const a = mine.find((x) => x.apptNumber === n);
              return (
                <tr key={n} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-semibold">#{n}</td>
                  <td className="px-4 py-3">
                    {a
                      ? new Date(a.scheduledAt).toLocaleString("en-GB", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="drec-pill bg-chip text-brand-deep">
                      {a?.status ?? "not scheduled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {a?.slideReleased ? "Released" : "Pending (post-consult)"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {a?.zoomJoinUrl && a.status === "scheduled" && (
                      <button className="drec-btn-primary">Join</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
