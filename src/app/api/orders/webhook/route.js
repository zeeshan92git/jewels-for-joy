import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { generateJazzCashHash } from '@/lib/jazzcash';

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    // 1. Extract the hash sent by JazzCash and remove it from the data object to verify
    const receivedHash = data.pp_SecureHash;
    delete data.pp_SecureHash;

    // 2. Re-generate hash from the received data to check authenticity
    const calculatedHash = generateJazzCashHash(data);

    if (receivedHash !== calculatedHash) {
      return NextResponse.json({ message: "Hash mismatch/Tampering detected" }, { status: 400 });
    }

    // 3. Update Order Status
    const orderId = data.pp_BillReference;
    const status = data.pp_ResponseCode === "000" ? "Paid" : "Cancelled";

    await Order.findByIdAndUpdate(orderId, {
      status,
      paymentDetails: {
        transactionId: data.pp_RetreivalReferenceNo,
        pp_ResponseCode: data.pp_ResponseCode
      }
    });

    // 4. Redirect user to a Success or Failure page on the frontend
    const redirectUrl = status === "Paid" 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success` 
      : `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failed`;

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}