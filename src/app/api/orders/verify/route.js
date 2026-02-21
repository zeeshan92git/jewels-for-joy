import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function PATCH(req) {
  try {
    await dbConnect();
    const { orderId, status } = await req.json();

    // 1. Validation
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    if (!status) {
      return NextResponse.json({ error: "New status is required" }, { status: 400 });
    }

    // 2. Security: Ensure the status matches your Schema enum
    const allowedStatuses = ['Pending', 'Verified', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // 3. Database Update
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status }, // Dynamically use the status passed from the frontend
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}