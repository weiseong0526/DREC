import { StatusPill } from "@/components/StatusPill";
import { PATIENTS } from "@/lib/mock-data";

export default function PatientsFolder() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patient's Folder · 病人档案</h1>
          <p className="text-sm text-muted">{PATIENTS.length} patients across the program.</p>
        </div>
        <div className="flex gap-2">
          <button className="drec-btn">Filter</button>
          <button className="drec-btn-primary">+ Add patient</button>
        </div>
      </div>

      <section className="drec-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg/50 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">Dietitian</th>
              <th className="px-4 py-3 text-left">Day</th>
              <th className="px-4 py-3 text-left">Program</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">HbA1c</th>
              <th className="px-4 py-3 text-left">Last active</th>
            </tr>
          </thead>
          <tbody>
            {PATIENTS.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-bg/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-chip text-xs font-bold text-brand-deep">
                      {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-muted">
                        {p.enrollmentId} · {p.country} · {p.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="drec-chip">{p.assignedDietitian}</span>
                </td>
                <td className="px-4 py-3 font-semibold">{p.currentDay}/100</td>
                <td className="px-4 py-3">
                  <StatusPill value={p.programState} />
                </td>
                <td className="px-4 py-3">
                  <StatusPill value={p.paymentStatus} />
                </td>
                <td className="px-4 py-3">
                  <StatusPill value={p.status} />
                </td>
                <td className="px-4 py-3">
                  {p.hba1cBaseline && p.hba1cCurrent ? (
                    <>
                      <b>{p.hba1cCurrent}%</b>
                      <span className="ml-1 text-xs text-state-ok">
                        -{(p.hba1cBaseline - p.hba1cCurrent).toFixed(1)}
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted">
                  {new Date(p.lastActiveAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
