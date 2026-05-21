import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@nidaan.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin@123";
  const adminName = process.env.ADMIN_NAME || "Nidaan Admin";

  console.log("🌱 Seeding database...");
  console.log(`Checking if admin user with email "${adminEmail}" exists...`);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin user already exists. Updating password and name...");
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        name: adminName,
        password: hashedPassword,
      },
    });
    console.log("✅ Admin user successfully updated!");
  } else {
    console.log("➕ Creating new admin user...");
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
      },
    });
    console.log("✅ Admin user successfully created!");
  }

  // console.log("\n🔑 Admin Credentials:");
  // console.log(`   - Email:    ${adminEmail}`);
  // console.log(`   - Password: ${adminPassword}`);
  // console.log("------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
