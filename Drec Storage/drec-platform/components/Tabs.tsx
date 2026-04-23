"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabItem {
  href: string;
  label: string;
  labelCn?: string;
  badge?: number | string;
}

export function Tabs({ items }: { items: TabItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="drec-tabs" aria-label="Section tabs">
      {items.map((t) => {
        const active = pathname === t.href || pathname?.startsWith(t.href + "/");
        return (
          <Link key={t.href} href={t.href} className="drec-tab" data-active={active}>
            <span>{t.label}</span>
            {t.labelCn && <span className="text-muted">· {t.labelCn}</span>}
            {t.badge !== undefined && (
              <span className="ml-1 rounded-full bg-state-bad px-1.5 py-0.5 text-[10px] font-bold text-white">
                {t.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
