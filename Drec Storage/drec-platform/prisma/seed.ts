import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 seeding DREC database …");

  const [eason, ss, jen, cy] = await Promise.all([
    prisma.staff.upsert({
      where: { email: "eason@drec.my" },
      update: {},
      create: { name: "Dr. Eason Chang", role: "dr_eason", email: "eason@drec.my", passwordHash: "!seeded!", totpEnabled: true },
    }),
    prisma.staff.upsert({
      where: { email: "ss@drec.my" },
      update: {},
      create: { name: "Dietitian SS", role: "dietitian", code: "SS", email: "ss@drec.my", passwordHash: "!seeded!", totpEnabled: true },
    }),
    prisma.staff.upsert({
      where: { email: "jen@drec.my" },
      update: {},
      create: { name: "Dietitian Jen", role: "dietitian", code: "Jen", email: "jen@drec.my", passwordHash: "!seeded!", totpEnabled: true },
    }),
    prisma.staff.upsert({
      where: { email: "cy@drec.my" },
      update: {},
      create: { name: "Dietitian CY", role: "dietitian", code: "CY", email: "cy@drec.my", passwordHash: "!seeded!", totpEnabled: true },
    }),
  ]);

  console.log(`✓ seeded ${[eason, ss, jen, cy].length} staff`);

  await prisma.patient.upsert({
    where: { enrollmentId: "DREC-2026-00011" },
    update: {},
    create: {
      enrollmentId: "DREC-2026-00011",
      name: "Tan Wei Ming",
      nameCn: "陈伟明",
      phone: "+60127770011",
      email: "weiming@example.com",
      country: "MY",
      dob: new Date("1971-04-18"),
      day1Date: new Date("2026-02-10"),
      status: "active",
      paymentStatus: "complete",
      assignedDietitianId: ss.id,
      weightKg: 78.2,
      waistCm: 94,
      hba1cBaseline: 8.9,
      hba1cCurrent: 6.7,
      pdpaConsentAt: new Date("2026-02-08"),
    },
  });

  console.log("✓ seed complete");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
