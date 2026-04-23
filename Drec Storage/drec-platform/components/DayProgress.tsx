export function DayProgress({ day, total = 100 }: { day: number; total?: number }) {
  const pct = Math.min(100, Math.max(0, (day / total) * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-muted">
        <span>
          Day <b className="text-ink">{day}</b> / {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-chip">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg,#7BC142 0%,#1E88E5 100%)",
          }}
        />
      </div>
    </div>
  );
}
