import Link from "next/link";

const LINKS = [
  {
    href: "/onboarding",
    title: "Patient Onboarding",
    titleCn: "病人注册",
    desc: "5-step enrolment wizard — basic info, health profile, lifestyle, diet, PDPA consent. Generates DREC-YYYY-##### enrolment ID.",
    tag: "Public",
    color: "from-[#5C1F2A] to-[#D63A4D]",
  },
  {
    href: "/patient/home",
    title: "Patient Portal",
    titleCn: "病人端",
    desc: "Home · Chat · Resources · Appointments · Progress · Settings. 6 tabs gated by program validity state (active / grace / expired).",
    tag: "Phone + OTP",
    color: "from-[#1565C0] to-[#26C1E8]",
  },
  {
    href: "/admin/dashboard",
    title: "Admin / Doctor Portal",
    titleCn: "医生端",
    desc: "Dashboard · Patients · Chat Approval · Appointments · Resources · Templates · Progress. Human-in-the-loop AI drafts.",
    tag: "Email + TOTP 2FA",
    color: "from-[#1E88E5] to-[#7BC142]",
  },
];

export default function HomePage() {
  return (
    <div>
      <div className="drec-header">
        <div className="flex items-center gap-3 font-bold">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sm font-black text-brand shadow">
            DREC
          </div>
          <span>DREC Healthcare Academy</span>
        </div>
        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
          Platform
        </span>
        <span className="flex-1" />
        <span className="text-xs text-white/80">100-Day Diabetes Reversal · MY + SG</span>
      </div>

      <main className="px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Welcome — pick an entry point</h1>
          <p className="mt-1 text-muted">
            Prototype build against mock data. Full spec in <code>DREC Software Developer Walkthrough.docx</code>.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="drec-card group relative overflow-hidden transition hover:shadow-pop"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${l.color}`}
                aria-hidden
              />
              <div className="mb-3 flex items-center justify-between">
                <span className="drec-chip">{l.tag}</span>
              </div>
              <div className="text-lg font-bold">{l.title}</div>
              <div className="text-sm text-muted">{l.titleCn}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{l.desc}</p>
              <div className="mt-4 text-sm font-semibold text-brand group-hover:underline">
                Open →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 drec-card">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            System map
          </div>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <div className="font-semibold">Stack</div>
              <div className="text-muted">
                Next.js 14 · React · TailwindCSS · PostgreSQL 15 (Prisma) · Redis/BullMQ · Claude
                Sonnet 4.6 + Haiku 4.5 · WhatsApp Business Cloud API · Zoom · Stripe
              </div>
            </div>
            <div>
              <div className="font-semibold">AI Boundaries</div>
              <div className="text-muted">
                Every outbound message requires admin approval by default. Medication step-downs =
                Dr. Eason only. Emergency (glucose &lt; 3 or &gt; 14 mmol/L) uses pre-approved
                template with 5-min SLA.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
