require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createOrResetAdmin() {
  const email = String(process.env.INITIAL_ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD || "";
  const name = String(process.env.INITIAL_ADMIN_NAME || "Astrology Admin").trim();
  const resetExisting = String(process.env.RESET_EXISTING_ADMIN || "false").toLowerCase() === "true";

  if (!email || !password || password.length < 12) {
    console.error(
      "Set INITIAL_ADMIN_EMAIL and a unique INITIAL_ADMIN_PASSWORD (at least 12 characters) in backend/.env before running this script."
    );
    process.exitCode = 1;
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing from backend/.env.");
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });

    const existingAdmin = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 12);

    if (existingAdmin) {
      if (!resetExisting) {
        console.error(
          `An account already exists for ${email}. No changes made. To deliberately promote/reset that exact account, set RESET_EXISTING_ADMIN=true in backend/.env and run this command again.`
        );
        process.exitCode = 1;
        return;
      }

      existingAdmin.name = name || existingAdmin.name;
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log(`Existing account updated as admin for ${email}; password reset from backend/.env.`);
      return;
    }

    const admin = await User.create({
      name: name || "Astrology Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });
    console.log(`Admin account created for ${admin.email}.`);
  } catch (error) {
    console.error("Could not create/reset admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

createOrResetAdmin();
