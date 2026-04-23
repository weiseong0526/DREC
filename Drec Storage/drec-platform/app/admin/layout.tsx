import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";
import { ADMIN_THREADS } from "@/lib/mock-data";

const TABS = [
  { href: "/admin/dashboard", label: "Dashboard", labelCn: "主页" },
  { href: "/admin/patients", label: "Patients", labelCn: "病人" },
  { href: "/admin/chat-approval", label: "Chat Approval", labelCn: "审核" },
  { href: "/admin/appointments", label: "Appointments", labelCn: "预约" },
  { href: "/admin/resources", label: "Resources", labelCn: "资料" },
  { href: "/admin/templates", label: "Templates", labelCn: "模板" },
  { href: "/admin/progress", label: "Progress", labelCn: "进展" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pendingDrafts = ADMIN_THREADS.filter((t) => t.aiDraft?.status === "pending").length;
  const tabsWithBadge = TABS.map((t) =>
    t.href === "/admin/chat-approval" && pendingDrafts > 0 ? { ...t, badge: pendingDrafts } : t
  );

  return (
    <>
      <Header role="ADMIN" userLabel="Dr. Eason Chang" />
      <Tabs items={tabsWithBadge} />
      <main className="px-6 py-6">{children}</main>
    </>
  );
}
