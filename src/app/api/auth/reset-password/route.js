import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    await dbConnect();

    console.log("---------------- RESET DEBUG START ----------------");
    console.log("1. Raw Token from URL:", token);

    // 1. Hash the token from the URL
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log("2. Hashed Token (searching for this):", hashedToken);

    // 2. Look for the user with JUST the token first (to see if token exists but is expired)
    
    const userByTokenOnly = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!userByTokenOnly) {
      console.log("ERROR: No user found with this Token Hash in DB.");
    } else {
      console.log("SUCCESS: User found by token. Now checking expiry...");
      console.log("DB Expiry Time:", new Date(userByTokenOnly.resetPasswordExpires).toLocaleString());
      console.log("Current Time:  ", new Date(Date.now()).toLocaleString());

      if (userByTokenOnly.resetPasswordExpires < Date.now()) {
        console.log("❌ ERROR: Token has expired.");
      }
    }

    // Actual query used for the logic
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("---------------- RESET DEBUG END (FAIL) ----------------");
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // 3. Hash the NEW password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("3. New Password Hashed Successfully");

    // 4. Update the user
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    console.log("4. 💾 Database updated! Password changed for:", user.email);
    console.log("---------------- RESET DEBUG END (SUCCESS) ----------------");

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("🔥 CRITICAL ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}