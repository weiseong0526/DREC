import { RESOURCES } from "@/lib/mock-data";

export default function AdminResources() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Learning Resources · 资料管理</h1>
          <p className="text-sm text-muted">
            Unlocks automatically by program day. Master Admin controls release schedule.
          </p>
        </div>
        <button className="drec-btn-primary">+ Upload</button>
      </div>

      <section className="drec-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg/50 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Stage</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Kind</th>
              <th className="px-4 py-3 text-left">Release day</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RESOURCES.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-0 hover:bg-bg/60">
                <td className="px-4 py-3 font-semibold">S{r.stage}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-xs text-muted">{r.titleCn}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="drec-chip">{r.kind.toUpperCase()}</span>
                </td>
                <td className="px-4 py-3">Day {r.releasedDay}</td>
                <td className="px-4 py-3 text-right">
                  <button className="drec-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
