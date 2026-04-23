# DREC Healthcare Academy — Platform

Production-oriented scaffold for the **100-Day Diabetes Reversal** patient-management platform
(Malaysia + Singapore), based on `DREC AI Jobscope - Software Companion.docx` and
`DREC Software Developer Walkthrough.docx` in the parent folder.

This is a **working Next.js 14 app running against mock data** — every screen renders, every tab
navigates, every design token matches the HTML v3 mockups. Your team plugs in the real backend
(NestJS/FastAPI), AI workers, WhatsApp/Zoom integrations, and Postgres against the included Prisma
schema.

---

## What's in here

| Path | Purpose |
|---|---|
| `app/page.tsx` | Landing · role switcher (3 entry points) |
| `app/onboarding/` | 5-step enrolment wizard → generates `DREC-YYYY-#####` ID |
| `app/patient/` | Patient portal (6 tabs): Home · Chat · Resources · Appointments · Progress · Settings |
| `app/admin/` | Admin / Doctor portal (7 tabs): Dashboard · Patients · **Chat Approval** · Appointments · Resources · Templates · Progress |
| `components/` | `Header`, `Tabs`, `StatusPill`, `DayProgress`, `ChatBubble`, `Sparkline`, `KpiCard` |
| `lib/types.ts` | Domain TypeScript — 1:1 with Prisma models |
| `lib/mock-data.ts` | Seed dataset for UI development (patients, threads, drafts, glucose logs, …) |
| `prisma/schema.prisma` | PostgreSQL schema — 25+ tables covering the full Walkthrough §8 spec |
| `prisma/seed.ts` | DB seed script |
| `app/globals.css` + `tailwind.config.ts` | DREC design tokens lifted verbatim from `DREC Admin UI v3.html` |

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Then:

- `/` — landing + role switcher
- `/onboarding` — patient enrolment
- `/patient/home` — patient portal
- `/admin/chat-approval` — most-used screen; keyboard shortcuts `A` approve · `E` edit · `R` reject · `J`/`K` next/prev

Type-check:

```bash
npm run typecheck
```

Database (when you're ready to connect Postgres):

```bash
cp .env.example .env.local    # fill DATABASE_URL
npm run db:generate
npm run db:push               # dev — applies schema without migration files
npm run db:seed
npm run db:studio             # visual Prisma Studio
```

---

## What's real vs stubbed

| Real | Stubbed |
|---|---|
| All 14 routes render against mock data | No API routes yet (`app/api/*` to be built) |
| Prisma schema — 25 tables, enums, indexes, relations | No migration applied yet |
| DREC design tokens + Tailwind theme | No responsive mobile tweaks (mockups cover mobile separately) |
| Chat Approval UX (3-pane + keyboard shortcuts + AI draft approve/edit/reject) | Approve/reject is local state only — no WhatsApp send |
| Patient validity-state banner (active / grace / expired) | No cron to move patient state automatically |
| Prisma types for WhatsApp chat, AI drafts, audit log | No WhatsApp Business webhook, no Anthropic client, no Zoom |

---

## Architecture decisions (aligned with spec)

- **Next.js 14 App Router** — Walkthrough explicitly recommends Next.js + Tailwind for web.
- **Single app, not a monorepo (yet)** — spec proposes `apps/web | apps/mobile | apps/api | apps/workers`; this scaffold is the `apps/web` piece. Add the others when you start that phase.
- **Prisma over TypeORM** — easier schema evolution, typed client, best Postgres support.
- **Server Components by default**, `"use client"` only where interaction (Onboarding wizard, Chat Approval, Patient Chat composer).
- **No auth in this scaffold** — Patient is phone+OTP (WhatsApp), Staff is email+password+TOTP. Plug into Auth0 / Clerk / custom per Walkthrough §11.

---

## Where to build next (mapping to Walkthrough §13 5-phase plan)

**Phase 1 — Foundation (weeks 1–4)**
- [ ] `app/api/auth/*` — patient OTP + staff TOTP
- [ ] `middleware.ts` — role gating, session refresh
- [ ] Prisma migrations + RLS policies
- [ ] `POST /onboarding/submit` — wire form to DB

**Phase 2 — Core clinical capture (weeks 5–9)**
- [ ] Patient logs (glucose / vitals / meal / label scan)
- [ ] Admin Patients Folder: server-side filter / search / pagination
- [ ] Consult notes + 4 appointment templates

**Phase 3 — Full AI layer + Patient portal (weeks 10–15)**
- [ ] WhatsApp Business Cloud API webhook → `chat_message`
- [ ] Claude Sonnet 4.6 draft worker → `ai_draft` (AI-01 … AI-09)
- [ ] AI extraction pipeline for logs (AI-01 glucose, AI-02 meal, AI-03 label OCR)
- [ ] Emergency escalation template AI-11 (glucose < 3 or > 14 → SMS + push + call)

**Phase 4 — Appointments & slide auto-gen (weeks 16–19)**
- [ ] Zoom OAuth + meeting/recording webhook
- [ ] `python-pptx` slide worker (BullMQ job per appointment, T-24h)
- [ ] Admin "Release slide" → updates `PatientSlide.releasedAt`

**Phase 5 — Proactive, Marketing, Mobile (weeks 20–23)**
- [ ] R1–R11 scheduled message cron (BullMQ repeatable jobs)
- [ ] Marketing capture (AI-26 / AI-27) with redaction + consent flow
- [ ] React Native / Expo app sharing `packages/ui`

---

## AI boundaries (don't skip)

Hard-coded in the spec, must be hard-coded in the worker:

1. **Default = every outbound AI message requires admin approval.** Only these auto-send:
   - AI-11 emergency template
   - R3–R10 scheduled messages where `auto_send = true`
   - AI-22 content-unlock notifications
   - (optional) AI-15 morning check-in
2. **Medication step-downs** always land in `medication_change.status = proposed` and require
   `confirmed_by = Dr. Eason`.
3. **Marketing captures** never leave the system without `consent_log.granted = true` for that specific item.
4. **AI never diagnoses** — fallback line: *"let me get Dr. Eason to look at this."*

Every `ai_draft` must be audit-able: `model_version`, `prompt_version`, `input_snapshot_hash`,
`approved_by`, `approved_at`, `time_to_approve_seconds`, `edit_diff`. All present in the Prisma
schema.

---

## Visual source of truth

The original mockups remain authoritative for pixel-level fidelity:

- `../DREC Onboarding UI v3.html`
- `../DREC Patient UI v3.html`
- `../DREC Patient Mobile UI v3.html`
- `../DREC Admin UI v3.html`
- `../DREC_Quick_Actions_UI_Preview.html`

The Tailwind theme and `globals.css` tokens were lifted from them directly.
