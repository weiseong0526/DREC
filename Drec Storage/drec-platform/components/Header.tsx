import Link from "next/link";

export function Header({
  role,
  userLabel,
  rightSlot,
}: {
  role: "PATIENT" | "ADMIN" | "ONBOARDING";
  userLabel?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="drec-header">
      <Link href="/" className="flex items-center gap-3 font-bold text-white no-underline">
        <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-white text-sm font-black text-brand shadow">
          DREC
        </div>
        <span className="text-base">DREC Healthcare Academy</span>
      </Link>
      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
        {role}
      </span>
      <span className="flex-1" />
      {rightSlot}
      {userLabel && (
        <span className="flex items-center gap-2 rounded-full bg-white/20 py-1 pl-1 pr-3 text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F6C57F] text-xs font-bold text-[#6A4A13]">
            {userLabel.slice(0, 2).toUpperCase()}
          </span>
          {userLabel}
        </span>
      )}
    </header>
  );
}
