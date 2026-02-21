import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

// DELETE Category
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { Id } = await params;
    // Optional: Check if products are linked to this category before deleting

    const products = await Product.countDocuments({ category: Id });
    if (products > 0) return NextResponse.json({ error: "Cannot delete category with linked products" }, { status: 400 });

    await Category.findByIdAndDelete(Id);
    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE Category
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { Id } = await params;
    console.log("Id fetched in delete:",Id);
    const { name, slug, isActive } = await req.json();

    const updated = await Category.findByIdAndUpdate(Id, { name, slug, isActive }, { new: true, runValidators: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}