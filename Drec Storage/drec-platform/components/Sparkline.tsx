export function Sparkline({
  points,
  width = 320,
  height = 80,
  targetBand,
  stroke = "#1E88E5",
}: {
  points: number[];
  width?: number;
  height?: number;
  targetBand?: [number, number];
  stroke?: string;
}) {
  if (points.length === 0) return null;
  const min = Math.min(...points, targetBand?.[0] ?? Infinity) - 0.5;
  const max = Math.max(...points, targetBand?.[1] ?? -Infinity) + 0.5;
  const x = (i: number) => (i / Math.max(1, points.length - 1)) * (width - 8) + 4;
  const y = (v: number) => height - ((v - min) / (max - min)) * (height - 10) - 5;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p).toFixed(1)}`).join(" ");
  return (
    <svg width={width} height={height} className="block">
      {targetBand && (
        <rect
          x={0}
          y={y(targetBand[1])}
          width={width}
          height={Math.max(2, y(targetBand[0]) - y(targetBand[1]))}
          fill="#E8F6EE"
        />
      )}
      <path d={path} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p)} r={3} fill={stroke} />
      ))}
    </svg>
  );
}
