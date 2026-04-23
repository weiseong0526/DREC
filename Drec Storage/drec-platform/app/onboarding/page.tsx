"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { STAFF } from "@/lib/mock-data";

const STEPS = [
  { n: 1, title: "Welcome", titleCn: "欢迎" },
  { n: 2, title: "Basic & Medical", titleCn: "基本 · 病史" },
  { n: 3, title: "Lifestyle", titleCn: "生活习惯" },
  { n: 4, title: "Dietary Habits", titleCn: "饮食习惯" },
  { n: 5, title: "Review & Submit", titleCn: "确认提交" },
];

interface FormState {
  dietitian: "SS" | "Jen" | "CY" | "";
  name: string;
  nameCn: string;
  phone: string;
  email: string;
  country: "MY" | "SG" | "";
  age: string;
  heightCm: string;
  weightKg: string;
  waistCm: string;
  pmh: string;
  surgery: string;
  meds: string;
  allergies: string;
  symptoms: string[];
  occupation: string;
  workHours: string;
  shift: string;
  smoking: string;
  alcohol: string;
  sleepHr: string;
  activity: string;
  exercise: string;
  vegetarian: string;
  mealsPerDay: string;
  foodAllergies: string;
  skipMeals: string;
  waterLitres: string;
  sugaryIntake: string;
  pdpaConsent: boolean;
  marketingOptIn: boolean;
}

const EMPTY: FormState = {
  dietitian: "",
  name: "",
  nameCn: "",
  phone: "",
  email: "",
  country: "",
  age: "",
  heightCm: "",
  weightKg: "",
  waistCm: "",
  pmh: "",
  surgery: "",
  meds: "",
  allergies: "",
  symptoms: [],
  occupation: "",
  workHours: "",
  shift: "",
  smoking: "",
  alcohol: "",
  sleepHr: "",
  activity: "",
  exercise: "",
  vegetarian: "",
  mealsPerDay: "",
  foodAllergies: "",
  skipMeals: "",
  waterLitres: "",
  sugaryIntake: "",
  pdpaConsent: false,
  marketingOptIn: false,
};

const SYMPTOM_OPTIONS = [
  "Excessive thirst",
  "Frequent urination",
  "Blurred vision",
  "Numbness / tingling",
  "Fatigue",
  "Unexplained weight change",
  "Slow-healing wounds",
];

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const enrollmentId = useMemo(
    () => `DREC-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`,
    []
  );

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSymptom = (s: string) =>
    set(
      "symptoms",
      form.symptoms.includes(s) ? form.symptoms.filter((x) => x !== s) : [...form.symptoms, s]
    );

  if (submitted) {
    return <Success enrollmentId={enrollmentId} dietitian={form.dietitian || "SS"} />;
  }

  const pct = (step / STEPS.length) * 100;
  const dietitians = STAFF.filter((s) => s.role === "dietitian");

  return (
    <div>
      <CoverBanner step={step} pct={pct} />

      <main className="px-6 py-8">
        <Stepper step={step} />

        <div className="drec-card mt-6">
          {step === 1 && (
            <Step1
              dietitian={form.dietitian}
              onPick={(d) => set("dietitian", d)}
              dietitians={dietitians}
            />
          )}
          {step === 2 && <Step2 form={form} set={set} toggleSymptom={toggleSymptom} />}
          {step === 3 && <Step3 form={form} set={set} />}
          {step === 4 && <Step4 form={form} set={set} />}
          {step === 5 && <Step5 form={form} set={set} enrollmentId={enrollmentId} />}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link href="/" className="drec-btn">
            ← Exit
          </Link>
          <div className="flex gap-2">
            {step > 1 && (
              <button className="drec-btn" onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4 | 5)}>
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                className="drec-btn-primary"
                disabled={step === 1 && !form.dietitian}
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4 | 5)}
              >
                Next →
              </button>
            ) : (
              <button
                className="drec-btn-accent"
                disabled={!form.pdpaConsent}
                onClick={() => setSubmitted(true)}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function CoverBanner({ step, pct }: { step: number; pct: number }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="px-6 py-10 text-white"
        style={{ background: "linear-gradient(135deg, #5C1F2A 0%, #D63A4D 100%)" }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
            DREC Healthcare Academy
          </div>
          <h1 className="mt-1 text-2xl font-bold">100-Day Diabetes Reversal Program</h1>
          <p className="text-white/80">100天糖尿病逆转计划 · 病人注册</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <div className="text-xs font-bold">Step {step} of 5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-2">
      {STEPS.map((s) => {
        const active = s.n === step;
        const done = s.n < step;
        return (
          <div key={s.n} className="flex flex-1 items-center gap-2">
            <div
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                done
                  ? "bg-accent text-white"
                  : active
                  ? "bg-brand text-white"
                  : "bg-chip text-muted"
              }`}
            >
              {done ? "✓" : s.n}
            </div>
            <div className={`text-xs ${active ? "text-ink" : "text-muted"}`}>
              <div className="font-semibold">{s.title}</div>
              <div>{s.titleCn}</div>
            </div>
            {s.n !== STEPS.length && <span className="flex-1 border-b border-dashed border-line" />}
          </div>
        );
      })}
    </div>
  );
}

function Step1({
  dietitian,
  onPick,
  dietitians,
}: {
  dietitian: string;
  onPick: (d: "SS" | "Jen" | "CY") => void;
  dietitians: { id: string; name: string; code?: string }[];
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-xl font-bold">Choose your dietitian / 选择你的营养师</h2>
      <p className="mt-1 text-sm text-muted">
        You'll be in the same dietitian's care for the full 100 days. You can request a change later.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {dietitians.map((d) => (
          <button
            key={d.id}
            onClick={() => onPick(d.code as "SS" | "Jen" | "CY")}
            className={`drec-card text-left transition hover:shadow-pop ${
              dietitian === d.code ? "border-brand ring-2 ring-brand/30" : ""
            }`}
          >
            <div className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-chip text-sm font-bold text-brand-deep">
              {d.code}
            </div>
            <div className="font-semibold">{d.name}</div>
            <div className="text-xs text-muted">Registered dietitian</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({
  form,
  set,
  toggleSymptom,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  toggleSymptom: (s: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section>
        <h2 className="mb-3 text-xl font-bold">Basic Info / 基本信息</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full Name" v={form.name} onChange={(v) => set("name", v)} />
          <Field label="Chinese Name 中文名" v={form.nameCn} onChange={(v) => set("nameCn", v)} />
          <Field label="Mobile (with country code)" v={form.phone} onChange={(v) => set("phone", v)} />
          <Field label="Email" v={form.email} onChange={(v) => set("email", v)} />
          <Select
            label="Country"
            v={form.country}
            options={[
              { v: "MY", l: "Malaysia 🇲🇾" },
              { v: "SG", l: "Singapore 🇸🇬" },
            ]}
            onChange={(v) => set("country", v as "MY" | "SG")}
          />
          <Field label="Age" v={form.age} onChange={(v) => set("age", v)} />
          <Field label="Height (cm)" v={form.heightCm} onChange={(v) => set("heightCm", v)} />
          <Field label="Weight (kg)" v={form.weightKg} onChange={(v) => set("weightKg", v)} />
          <Field label="Waist (cm)" v={form.waistCm} onChange={(v) => set("waistCm", v)} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Medical History / 病史</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextArea label="Past medical history" v={form.pmh} onChange={(v) => set("pmh", v)} />
          <TextArea label="Past surgeries" v={form.surgery} onChange={(v) => set("surgery", v)} />
          <TextArea label="Current medications" v={form.meds} onChange={(v) => set("meds", v)} />
          <TextArea label="Allergies" v={form.allergies} onChange={(v) => set("allergies", v)} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Symptoms / 症状</h2>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_OPTIONS.map((s) => {
            const on = form.symptoms.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSymptom(s)}
                className={`drec-pill border ${
                  on ? "border-brand bg-chip text-brand-deep" : "border-line text-muted"
                }`}
              >
                {on ? "✓ " : ""}
                {s}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Step3({
  form,
  set,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-3 text-xl font-bold">Lifestyle / 生活习惯</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Occupation" v={form.occupation} onChange={(v) => set("occupation", v)} />
        <Field label="Working hours / week" v={form.workHours} onChange={(v) => set("workHours", v)} />
        <Select
          label="Shift pattern"
          v={form.shift}
          options={["Day", "Rotating", "Night", "Flexible"].map((o) => ({ v: o, l: o }))}
          onChange={(v) => set("shift", v)}
        />
        <Select
          label="Smoking"
          v={form.smoking}
          options={["Never", "Ex-smoker", "Occasional", "Daily"].map((o) => ({ v: o, l: o }))}
          onChange={(v) => set("smoking", v)}
        />
        <Select
          label="Alcohol"
          v={form.alcohol}
          options={["Never", "Occasional", "Weekly", "Daily"].map((o) => ({ v: o, l: o }))}
          onChange={(v) => set("alcohol", v)}
        />
        <Field label="Sleep (hours/night)" v={form.sleepHr} onChange={(v) => set("sleepHr", v)} />
        <Select
          label="Activity level"
          v={form.activity}
          options={["Sedentary", "Light", "Moderate", "Active"].map((o) => ({ v: o, l: o }))}
          onChange={(v) => set("activity", v)}
        />
        <Field label="Exercise frequency / week" v={form.exercise} onChange={(v) => set("exercise", v)} />
      </div>
    </div>
  );
}

function Step4({
  form,
  set,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-3 text-xl font-bold">Dietary Habits / 饮食习惯</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Dietary preference"
          v={form.vegetarian}
          options={["Non-veg", "Vegetarian", "Vegan", "Pescatarian", "Halal", "Other"].map((o) => ({
            v: o,
            l: o,
          }))}
          onChange={(v) => set("vegetarian", v)}
        />
        <Field label="Meals per day" v={form.mealsPerDay} onChange={(v) => set("mealsPerDay", v)} />
        <Field
          label="Food allergies / intolerances"
          v={form.foodAllergies}
          onChange={(v) => set("foodAllergies", v)}
        />
        <Select
          label="Do you skip meals?"
          v={form.skipMeals}
          options={["Never", "Sometimes", "Often", "Always"].map((o) => ({ v: o, l: o }))}
          onChange={(v) => set("skipMeals", v)}
        />
        <Field label="Water intake (L/day)" v={form.waterLitres} onChange={(v) => set("waterLitres", v)} />
        <Select
          label="Sugary drink intake"
          v={form.sugaryIntake}
          options={["None", "<1/day", "1–2/day", "3+/day"].map((o) => ({ v: o, l: o }))}
          onChange={(v) => set("sugaryIntake", v)}
        />
      </div>
    </div>
  );
}

function Step5({
  form,
  set,
  enrollmentId,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  enrollmentId: string;
}) {
  const rows: [string, string][] = [
    ["Assigned dietitian", form.dietitian || "—"],
    ["Name / 中文名", `${form.name || "—"} / ${form.nameCn || "—"}`],
    ["Phone", form.phone || "—"],
    ["Email", form.email || "—"],
    ["Country", form.country || "—"],
    ["Age / Height / Weight / Waist", `${form.age || "–"} · ${form.heightCm || "–"}cm · ${form.weightKg || "–"}kg · ${form.waistCm || "–"}cm`],
    ["PMH", form.pmh || "—"],
    ["Current meds", form.meds || "—"],
    ["Symptoms", form.symptoms.length ? form.symptoms.join(", ") : "None selected"],
    ["Occupation / hours", `${form.occupation || "—"} · ${form.workHours || "—"}`],
    ["Sleep / activity / exercise", `${form.sleepHr || "—"}h · ${form.activity || "—"} · ${form.exercise || "—"}`],
    ["Diet / meals / water", `${form.vegetarian || "—"} · ${form.mealsPerDay || "—"} meals · ${form.waterLitres || "—"} L`],
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-xl font-bold">Review / 确认</h2>
      <p className="mt-1 text-sm text-muted">
        Provisional enrolment ID · <code className="font-mono text-brand-deep">{enrollmentId}</code>{" "}
        · finalised on admin activation
      </p>
      <div className="drec-card mt-4 divide-y divide-line p-0">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[220px,1fr] gap-4 px-4 py-2.5 text-sm">
            <div className="text-muted">{k}</div>
            <div className="text-ink">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3 text-sm">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={form.pdpaConsent}
            onChange={(e) => set("pdpaConsent", e.target.checked)}
          />
          <span>
            <b>PDPA consent:</b> I consent to DREC processing my personal health data for the
            purpose of this 100-Day program, in accordance with the Personal Data Protection Act
            (MY/SG). I can request access, correction or erasure at any time.
          </span>
        </label>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={form.marketingOptIn}
            onChange={(e) => set("marketingOptIn", e.target.checked)}
          />
          <span>
            <b>Optional:</b> DREC may contact me with anonymised, consent-reviewed marketing
            material. (Never shared without explicit per-item consent.)
          </span>
        </label>
      </div>
    </div>
  );
}

function Success({ enrollmentId, dietitian }: { enrollmentId: string; dietitian: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-3xl text-white">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-bold">Application submitted</h1>
      <p className="mt-2 text-muted">
        Enrolment ID · <b className="font-mono text-brand-deep">{enrollmentId}</b>
      </p>
      <p className="mt-4 text-sm text-ink/80">
        Your assigned dietitian <b>{dietitian}</b> will message you on WhatsApp within 24 hours to
        confirm your Day 1 and activate your account. Until then, your portal is in <i>pending</i>{" "}
        state.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Link href="/" className="drec-btn">
          Home
        </Link>
        <Link href="/patient/home" className="drec-btn-primary">
          Preview patient portal →
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  v,
  onChange,
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="drec-label">{label}</span>
      <input className="drec-input" value={v} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
function TextArea({
  label,
  v,
  onChange,
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="drec-label">{label}</span>
      <textarea
        rows={3}
        className="drec-input"
        value={v}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function Select({
  label,
  v,
  options,
  onChange,
}: {
  label: string;
  v: string;
  options: { v: string; l: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="drec-label">{label}</span>
      <select className="drec-input" value={v} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
