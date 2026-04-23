import clsx from "clsx";

export function KpiCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "default" | "ok" | "warn" | "bad";
}) {
  return (
    <div className="drec-card">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div
        className={clsx("mt-2 text-2xl font-bold", {
          "text-ink": tone === "default",
          "text-state-ok": tone === "ok",
          "text-state-warn": tone === "warn",
          "text-state-bad": tone === "bad",
        })}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}
