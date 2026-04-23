// Domain types — mirror the Prisma schema in prisma/schema.prisma.
// Kept as pure TS so the UI can render against mock data before the API exists.

export type Dietitian = "SS" | "Jen" | "CY";
export type StaffRole = "master_admin" | "dr_eason" | "dietitian";
export type Country = "MY" | "SG";
export type Language = "en" | "zh" | "ms";

export type PatientStatus = "active" | "graduated" | "risk" | "hibernate" | "pending";
export type PaymentStatus = "complete" | "instalment" | "failed" | "notyet";
export type ProgramState = "active" | "grace" | "expired";
export type ProgramStage = 1 | 2 | 3 | 4 | 5; // 排糖期/排油期/排毒期/固醇期/保护期

export interface Patient {
  id: string;
  enrollmentId: string; // DREC-YYYY-#####
  name: string;
  nameCn?: string;
  phone: string;
  email?: string;
  country: Country;
  dob: string;
  day1Date: string;
  currentDay: number;
  programState: ProgramState;
  stage: ProgramStage;
  status: PatientStatus;
  paymentStatus: PaymentStatus;
  assignedDietitian: Dietitian;
  lastActiveAt: string;
  hba1cBaseline?: number;
  hba1cCurrent?: number;
  weightKg?: number;
  waistCm?: number;
}

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  code?: Dietitian; // only for dietitians
  email: string;
  totpEnabled: boolean;
}

export type ChatSender = "patient" | "dietitian" | "system" | "ai";

export interface ChatMessage {
  id: string;
  patientId: string;
  sender: ChatSender;
  text: string;
  photoUrl?: string;
  timestamp: string;
  readByAdmin: boolean;
}

export interface AiDraft {
  id: string;
  patientId: string;
  threadId: string;
  draftText: string;
  confidence: number;
  reasoning: string;
  inputSnapshotHash: string;
  modelVersion: string;
  promptVersion: string;
  status: "pending" | "approved" | "edited" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  timeToApproveSec?: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  apptNumber: 1 | 2 | 3 | 4;
  scheduledAt: string;
  zoomJoinUrl?: string;
  slideReleased: boolean;
  status: "scheduled" | "completed" | "missed" | "rescheduled";
}

export interface GlucoseLog {
  id: string;
  patientId: string;
  readingMmolL: number;
  type: "fbs" | "2hpp" | "random";
  loggedAt: string;
  note?: string;
}

export interface MealLog {
  id: string;
  patientId: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  photoUrl?: string;
  aiTags?: string[];
  loggedAt: string;
}

export interface LearningResource {
  id: string;
  title: string;
  titleCn?: string;
  stage: ProgramStage;
  kind: "video" | "pdf" | "article";
  releasedDay: number;
  url: string;
}

export interface ScheduledMessage {
  id: string;
  templateCode: `R${number}`; // R1..R11
  patientId: string;
  sendAt: string;
  status: "queued" | "sent" | "cancelled";
  autoSend: boolean;
}

export interface AdminThread {
  id: string;
  patientId: string;
  preview: string;
  urgent?: boolean;
  unread: number;
  messages: ChatMessage[];
  aiDraft?: AiDraft;
}
