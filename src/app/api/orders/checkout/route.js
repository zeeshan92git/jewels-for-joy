import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { uploadImage } from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Please login" }, { status: 401 });

    await dbConnect();
    const formData = await req.formData();

    // Extracting all fields
    const items = JSON.parse(formData.get('items'));
    const paymentMethod = formData.get('paymentMethod');
    const totalAmount = formData.get('totalAmount');
    
    // Extracting shipping info
    const shippingAddress = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
    };
    // 2. Log it to your terminal to verify before saving
    console.log("Saving Shipping Address:", shippingAddress);

    // Handle Screenshot if it exists
    let screenshotUrl = "";
    const file = formData.get('screenshot');
    if (file && file.size > 0) {
      screenshotUrl = await uploadImage(file, "payments");
    }

    const order = await Order.create({
      user: session.user.id,
      items,
      shippingAddress,
      paymentMethod,
      paymentScreenshot: screenshotUrl,
      totalAmount: Number(totalAmount),
      status:'Pending'
    });

    return NextResponse.json({ success: true, orderId: order._id }, { status: 201 });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}