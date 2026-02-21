import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { email } = await req.json();
        console.log("📩 Forgot Password request for:", email);

        await dbConnect();

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        
        if (!user) {
            console.log("❌ User not found in database:", email);
            // For security, don't reveal if the email exists to the frontend
            return NextResponse.json({ message: "If an account exists, a link has been sent." }, { status: 200 });
        }

        console.log("✅ User found:", user.email, "ID:", user._id);

        // Generate Tokens
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const expiry = Date.now() + 3600000; // 1 hour for testing

        console.log("🔑 Generated Hash for DB:", hash);

        // Update Database using findOneAndUpdate to ensure fields are created if missing
        const updatedUser = await User.findOneAndUpdate(
            { email: email.toLowerCase().trim() },
            {
                $set: {
                    resetPasswordToken: hash,
                    resetPasswordExpires: expiry
                }
            },
            { new: true, runValidators: false }
        );

        if (updatedUser) {
            console.log("💾 Database updated successfully with token and expiry");
        } else {
            console.log("⚠️ Failed to update user fields in DB");
        }

        // Configure Mailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
        console.log("🔗 Reset Link being sent:", resetUrl);

        const mailOptions = {
            from: '"Jewels for Joy" <jewelsforjoyoff@gmail.com>',
            to: user.email,
            subject: 'Secure Access Recovery',
            html: `
                <div style="background-color: #f9f8f6; padding: 40px 10px; font-family: 'Times New Roman', serif;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <tr>
                      <td align="center" style="padding: 40px 0 20px 0; background-color: #000000;">
                        <img src="https://res.cloudinary.com/dophfzeep/image/upload/v1768305467/Gemini_Generated_Image_t1w5ilt1w5ilt1w5-removebg-preview_fawjhk.png" alt="Jewels for Joy" width="100" height="100" style="display: block; border-radius: 50%; border: 2px solid #D4AF37;">
                        <h1 style="color: #ffffff; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; margin-top: 15px; font-weight: normal;">
                          Jewels <span style="color: #D4AF37;">for</span> Joy
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px; text-align: center; color: #1c1917;">
                        <h2 style="font-style: italic; font-weight: normal; font-size: 22px; margin-bottom: 20px;">Password Recovery Request</h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #57534e; margin-bottom: 30px;">
                          A request was made to reset the credentials for your boutique account. To regain access to your collection, please click the button below.
                        </p>
                        <a href="${resetUrl}" style="background-color: #000000; color: #ffffff; padding: 15px 35px; text-decoration: none; display: inline-block; font-size: 11px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; border-radius: 0px;">
                          Reset Password
                        </a>
                        <p style="font-size: 11px; color: #9ca3af; margin-top: 40px;">
                          This secure link is valid for exactly <span style="color: #b91c1c; font-weight: bold;">60 minutes</span>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px; background-color: #fafaf9; text-align: center; border-top: 1px solid #f5f5f4;">
                        <p style="font-size: 10px; color: #a8a29e; letter-spacing: 2px; text-transform: uppercase;">
                          Handcrafted with Passion • 2025
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              `,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent successfully to:", user.email);
        
        return NextResponse.json({ message: "Reset link sent" });

    } catch (error) {
        console.error("🔥 ERROR in Forgot Password Route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}