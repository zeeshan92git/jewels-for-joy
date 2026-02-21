import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { uploadImage } from '@/lib/cloudinary';

// GET: List all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new category (Admin Protected)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Authorization Check
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    
    // 2. Parse FormData instead of JSON
    const formData = await req.formData();
    const name = formData.get('name');
    const imageFile = formData.get('image'); // This is now a File object

    if (!name || !imageFile) {
      return NextResponse.json({ error: "Name and Image are required" }, { status: 400 });
    }

    // 3. Upload to Cloudinary
    // We pass the file and a folder name ('categories')
    const imageUrl = await uploadImage(imageFile, "categories");

    // 4. Create Slug
    const slug = name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    // 5. Save to MongoDB
    const category = await Category.create({ 
      name, 
      slug, 
      image: imageUrl, // Save the secure URL from Cloudinary
      isActive: true 
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Category Creation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}