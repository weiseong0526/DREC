import clsx from "clsx";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-[#E8F6EE] text-[#2E7D32] border-[#C8E6CF]",
  graduated: "bg-[#E3F2FD] text-brand-deep border-[#BBDEFB]",
  risk: "bg-[#FFEBEE] text-state-bad border-[#FFCDD2]",
  hibernate: "bg-[#ECEFF1] text-[#546E7A] border-[#CFD8DC]",
  pending: "bg-hl text-[#8A6200] border-hl-bd",

  complete: "bg-[#E8F6EE] text-[#2E7D32] border-[#C8E6CF]",
  instalment: "bg-hl text-[#8A6200] border-hl-bd",
  failed: "bg-[#FFEBEE] text-state-bad border-[#FFCDD2]",
  notyet: "bg-[#ECEFF1] text-[#546E7A] border-[#CFD8DC]",

  grace: "bg-hl text-[#8A6200] border-hl-bd",
  expired: "bg-[#FFEBEE] text-state-bad border-[#FFCDD2]",
};

export function StatusPill({ value, label }: { value: string; label?: string }) {
  return (
    <span className={clsx("drec-pill", STATUS_STYLES[value] ?? "bg-chip text-brand-deep border-line")}>
      {label ?? value}
    </span>
  );
}
