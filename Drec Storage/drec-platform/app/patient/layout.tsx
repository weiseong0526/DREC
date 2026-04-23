import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";
import { PATIENTS } from "@/lib/mock-data";

const TABS = [
  { href: "/patient/home", label: "Home", labelCn: "首页" },
  { href: "/patient/chat", label: "Chat", labelCn: "聊天" },
  { href: "/patient/resources", label: "Resources", labelCn: "学习" },
  { href: "/patient/appointments", label: "Appointments", labelCn: "预约" },
  { href: "/patient/progress", label: "Progress", labelCn: "进展" },
  { href: "/patient/settings", label: "Settings", labelCn: "设置" },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const me = PATIENTS[0];
  return (
    <>
      <Header role="PATIENT" userLabel={me.name} />
      <Tabs items={TABS} />
      <main className="px-6 py-6">{children}</main>
    </>
  );
}
