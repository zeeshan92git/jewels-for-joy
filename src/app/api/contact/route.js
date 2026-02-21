import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Please login" }, { status: 401 });
    // }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- 1. ADMIN NOTIFICATION EMAIL ---
    const adminMailOptions = {
      from: '"Boutique Alert" <jewelsforjoyoff@gmail.com>',
      to: 'jewelsforjoyoff@gmail.com',
      replyTo: email,
      subject: `✨ New Inquiry: ${name}`,
      html: `
    <div style="background-color: #f9f8f6; padding: 40px 10px; font-family: 'Times New Roman', serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <tr>
          <td align="center" style="padding: 40px 0 20px 0; background-color: #000000;">
            <img src="https://res.cloudinary.com/dophfzeep/image/upload/v1768305467/Gemini_Generated_Image_t1w5ilt1w5ilt1w5-removebg-preview_fawjhk.png" alt="Jewels for Joy" width="80" height="80" style="display: block; border-radius: 50%; border: 2px solid #D4AF37;">
            <h1 style="color: #ffffff; font-size: 20px; letter-spacing: 4px; text-transform: uppercase; margin-top: 15px; font-weight: normal;">
              New <span style="color: #D4AF37;">Inquiry</span>
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px; color: #1c1917;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a8a29e; margin-bottom: 5px;">Client Name</p>
            <p style="font-size: 16px; margin-bottom: 20px; font-weight: bold;">${name}</p>
            
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a8a29e; margin-bottom: 5px;">Client Email</p>
            <p style="font-size: 16px; margin-bottom: 25px;">${email}</p>
            
            <div style="padding: 20px; background-color: #fafaf9; border-left: 3px solid #D4AF37; margin-bottom: 30px;">
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a8a29e; margin-bottom: 10px;">Message</p>
              <p style="font-size: 15px; line-height: 1.6; font-style: italic;">"${message}"</p>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${email}" style="background-color: #000000; color: #ffffff; padding: 15px 35px; text-decoration: none; display: inline-block; font-size: 11px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase;">
                Reply to Client
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; background-color: #fafaf9; text-align: center; border-top: 1px solid #f5f5f4;">
            <p style="font-size: 10px; color: #a8a29e; letter-spacing: 2px; text-transform: uppercase;">
              Boutique Management System • 2025
            </p>
          </td>
        </tr>
      </table>
    </div>
  `,
    };
    // --- 2. CUSTOMER AUTO-RESPONDER EMAIL ---
    const customerAutoResponder = {
      from: '"Jewels for Joy" <jewelsforjoyoff@gmail.com>',
      to: email,
      subject: 'We have received your inquiry - Jewels for Joy',
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
            <h2 style="font-style: italic; font-weight: normal; font-size: 22px; margin-bottom: 20px;">Thank You for Reaching Out</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #57534e; margin-bottom: 20px;">
              Dear ${name}, we have successfully received your inquiry. Our concierge team is currently reviewing your message and will provide a personalized response shortly.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #57534e; margin-bottom: 30px;">
              Your interest in our handcrafted collections is truly appreciated.
            </p>
            <div style="height: 1px; background-color: #e5e5e5; width: 50px; margin: 0 auto 30px auto;"></div>
            <p style="font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px;">
              Expect a response within 24 hours.
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

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerAutoResponder)
    ]);

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ message: "Failed to send messages" }, { status: 500 });
  }
}