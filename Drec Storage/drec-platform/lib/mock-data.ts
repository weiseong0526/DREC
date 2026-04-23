import type {
  AdminThread,
  Appointment,
  GlucoseLog,
  LearningResource,
  MealLog,
  Patient,
  ScheduledMessage,
  Staff,
} from "./types";

export const STAFF: Staff[] = [
  { id: "s_eason", name: "Dr. Eason Chang", role: "dr_eason", email: "eason@drec.my", totpEnabled: true },
  { id: "s_ss", name: "Dietitian SS", role: "dietitian", code: "SS", email: "ss@drec.my", totpEnabled: true },
  { id: "s_jen", name: "Dietitian Jen", role: "dietitian", code: "Jen", email: "jen@drec.my", totpEnabled: true },
  { id: "s_cy", name: "Dietitian CY", role: "dietitian", code: "CY", email: "cy@drec.my", totpEnabled: true },
];

export const PATIENTS: Patient[] = [
  {
    id: "p_001",
    enrollmentId: "DREC-2026-00011",
    name: "Tan Wei Ming",
    nameCn: "陈伟明",
    phone: "+60127770011",
    email: "weiming@example.com",
    country: "MY",
    dob: "1971-04-18",
    day1Date: "2026-02-10",
    currentDay: 72,
    programState: "active",
    stage: 4,
    status: "active",
    paymentStatus: "complete",
    assignedDietitian: "SS",
    lastActiveAt: "2026-04-22T09:12:00+08:00",
    hba1cBaseline: 8.9,
    hba1cCurrent: 6.7,
    weightKg: 78.2,
    waistCm: 94,
  },
  {
    id: "p_002",
    enrollmentId: "DREC-2026-00012",
    name: "Sarah Lim",
    nameCn: "林萨拉",
    phone: "+60129993344",
    email: "sarah@example.com",
    country: "MY",
    dob: "1983-11-02",
    day1Date: "2026-03-15",
    currentDay: 39,
    programState: "active",
    stage: 2,
    status: "active",
    paymentStatus: "instalment",
    assignedDietitian: "Jen",
    lastActiveAt: "2026-04-23T07:40:00+08:00",
    hba1cBaseline: 9.4,
    hba1cCurrent: 7.9,
    weightKg: 84.0,
    waistCm: 102,
  },
  {
    id: "p_003",
    enrollmentId: "DREC-2026-00013",
    name: "Raj Kumar",
    phone: "+65 81234567",
    email: "raj@example.sg",
    country: "SG",
    dob: "1965-07-24",
    day1Date: "2026-01-04",
    currentDay: 109,
    programState: "grace",
    stage: 5,
    status: "risk",
    paymentStatus: "complete",
    assignedDietitian: "CY",
    lastActiveAt: "2026-04-20T21:05:00+08:00",
    hba1cBaseline: 10.1,
    hba1cCurrent: 7.4,
    weightKg: 91.3,
    waistCm: 108,
  },
  {
    id: "p_004",
    enrollmentId: "DREC-2025-00988",
    name: "Nurul Aisyah",
    phone: "+60137770099",
    country: "MY",
    dob: "1978-02-12",
    day1Date: "2025-12-01",
    currentDay: 144,
    programState: "expired",
    stage: 5,
    status: "graduated",
    paymentStatus: "complete",
    assignedDietitian: "SS",
    lastActiveAt: "2026-04-15T10:00:00+08:00",
    hba1cBaseline: 8.2,
    hba1cCurrent: 5.9,
    weightKg: 68.0,
    waistCm: 84,
  },
  {
    id: "p_005",
    enrollmentId: "DREC-2026-00020",
    name: "David Ong",
    nameCn: "王大伟",
    phone: "+60123334455",
    country: "MY",
    dob: "1990-06-30",
    day1Date: "2026-04-18",
    currentDay: 5,
    programState: "active",
    stage: 1,
    status: "active",
    paymentStatus: "notyet",
    assignedDietitian: "Jen",
    lastActiveAt: "2026-04-23T12:30:00+08:00",
    hba1cBaseline: 7.8,
    weightKg: 80.0,
    waistCm: 96,
  },
];

export const APPOINTMENTS: Appointment[] = [
  { id: "a_1", patientId: "p_001", apptNumber: 3, scheduledAt: "2026-04-28T10:00:00+08:00", zoomJoinUrl: "https://zoom.us/j/demo1", slideReleased: false, status: "scheduled" },
  { id: "a_2", patientId: "p_002", apptNumber: 2, scheduledAt: "2026-04-26T14:00:00+08:00", slideReleased: true, status: "scheduled" },
  { id: "a_3", patientId: "p_003", apptNumber: 4, scheduledAt: "2026-04-24T16:30:00+08:00", slideReleased: false, status: "scheduled" },
];

export const GLUCOSE_LOGS: GlucoseLog[] = [
  { id: "g_1", patientId: "p_001", readingMmolL: 5.6, type: "fbs", loggedAt: "2026-04-23T07:15:00+08:00" },
  { id: "g_2", patientId: "p_001", readingMmolL: 7.1, type: "2hpp", loggedAt: "2026-04-22T14:10:00+08:00" },
  { id: "g_3", patientId: "p_001", readingMmolL: 5.9, type: "fbs", loggedAt: "2026-04-22T07:20:00+08:00" },
  { id: "g_4", patientId: "p_001", readingMmolL: 6.2, type: "fbs", loggedAt: "2026-04-21T07:05:00+08:00" },
  { id: "g_5", patientId: "p_001", readingMmolL: 5.4, type: "fbs", loggedAt: "2026-04-20T07:00:00+08:00" },
  { id: "g_6", patientId: "p_001", readingMmolL: 6.0, type: "fbs", loggedAt: "2026-04-19T07:25:00+08:00" },
  { id: "g_7", patientId: "p_001", readingMmolL: 5.7, type: "fbs", loggedAt: "2026-04-18T07:10:00+08:00" },
];

export const MEAL_LOGS: MealLog[] = [
  { id: "m_1", patientId: "p_001", mealType: "breakfast", aiTags: ["eggs", "avocado", "coffee (no sugar)"], loggedAt: "2026-04-23T08:05:00+08:00" },
  { id: "m_2", patientId: "p_001", mealType: "lunch", aiTags: ["grilled chicken", "salad", "olive oil"], loggedAt: "2026-04-22T13:00:00+08:00" },
];

export const RESOURCES: LearningResource[] = [
  { id: "r_1", title: "Welcome to the 100-Day Reversal", titleCn: "欢迎参加100天逆转计划", stage: 1, kind: "video", releasedDay: 1, url: "#" },
  { id: "r_2", title: "Why we cut carbs first", titleCn: "为何首先排糖", stage: 1, kind: "article", releasedDay: 3, url: "#" },
  { id: "r_3", title: "Stage 2 — Fat mobilisation", titleCn: "第二阶段 — 排油期", stage: 2, kind: "video", releasedDay: 21, url: "#" },
  { id: "r_4", title: "Reading a food label", titleCn: "如何看食品标签", stage: 2, kind: "pdf", releasedDay: 25, url: "#" },
  { id: "r_5", title: "Stage 4 — Stabilising HbA1c", titleCn: "第四阶段 — 稳定期", stage: 4, kind: "article", releasedDay: 65, url: "#" },
];

export const SCHEDULED_MESSAGES: ScheduledMessage[] = [
  { id: "sm_1", templateCode: "R3", patientId: "p_001", sendAt: "2026-04-24T08:00:00+08:00", status: "queued", autoSend: true },
  { id: "sm_2", templateCode: "R7", patientId: "p_002", sendAt: "2026-04-25T19:30:00+08:00", status: "queued", autoSend: false },
];

export const ADMIN_THREADS: AdminThread[] = [
  {
    id: "t_001",
    patientId: "p_002",
    preview: "Morning Jen, my fasting is 8.4 today — is that ok?",
    urgent: false,
    unread: 2,
    messages: [
      { id: "cm_1", patientId: "p_002", sender: "patient", text: "Morning Jen, my fasting is 8.4 today — is that ok?", timestamp: "2026-04-23T07:45:00+08:00", readByAdmin: false },
      { id: "cm_2", patientId: "p_002", sender: "patient", text: "I only had grilled fish + veg last night", timestamp: "2026-04-23T07:46:00+08:00", readByAdmin: false },
    ],
    aiDraft: {
      id: "d_001",
      patientId: "p_002",
      threadId: "t_001",
      draftText:
        "Hi Sarah, 8.4 is a little above target for Day 39 — this usually means the liver is still releasing stored sugar overnight. Can you log tonight's dinner photo and tomorrow's fasting? If it stays >8 for 3 days I'll flag it for Dr. Eason. 💪",
      confidence: 0.82,
      reasoning: "FBS trend rising 3d; Stage 2; no emergency thresholds crossed; patient asked for reassurance.",
      inputSnapshotHash: "sha256:…",
      modelVersion: "claude-sonnet-4-6",
      promptVersion: "v12",
      status: "pending",
    },
  },
  {
    id: "t_002",
    patientId: "p_003",
    preview: "I feel dizzy and sweaty, glucose says 2.8",
    urgent: true,
    unread: 1,
    messages: [
      { id: "cm_3", patientId: "p_003", sender: "patient", text: "I feel dizzy and sweaty, glucose says 2.8", timestamp: "2026-04-23T09:01:00+08:00", readByAdmin: false },
    ],
    aiDraft: {
      id: "d_002",
      patientId: "p_003",
      threadId: "t_002",
      draftText:
        "⚠️ HYPO ALERT — please take 15g fast sugar now (half cup juice OR 3 glucose tablets). Recheck in 15 min. I'm calling Dr. Eason now.",
      confidence: 0.98,
      reasoning: "Glucose 2.8 mmol/L (<3) + symptoms → emergency template AI-11, auto-send + SMS + call admin.",
      inputSnapshotHash: "sha256:…",
      modelVersion: "claude-sonnet-4-6",
      promptVersion: "v12-emerg",
      status: "pending",
    },
  },
  {
    id: "t_003",
    patientId: "p_001",
    preview: "Dinner photo 📷",
    urgent: false,
    unread: 0,
    messages: [
      { id: "cm_4", patientId: "p_001", sender: "patient", text: "Dinner tonight", timestamp: "2026-04-22T19:20:00+08:00", readByAdmin: true },
      { id: "cm_5", patientId: "p_001", sender: "dietitian", text: "Looks great — balanced plate. Keep it up! 👏", timestamp: "2026-04-22T20:05:00+08:00", readByAdmin: true },
    ],
  },
];

export function getPatient(id: string): Patient | undefined {
  return PATIENTS.find((p) => p.id === id);
}
