import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { uploadImage } from '@/lib/cloudinary';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const categorySlug = searchParams.get('category');
    const isFeatured = searchParams.get('featured');

    // 1. Get all Active Category IDs
    // This ensures we only show products from categories that are "Live"
    const activeCategories = await Category.find({ isActive: true }).select('_id');
    const activeCategoryIds = activeCategories.map(cat => cat._id);

    // 2. Build the Product filter
    // We only want products that are active AND belong to an active category
    let filter = { 
      isActive: true, 
      category: { $in: activeCategoryIds } 
    };

    // 3. Handle specific category filtering if a slug is provided
    if (categorySlug) {
      const selectedCategory = await Category.findOne({ 
        slug: categorySlug, 
        isActive: true // Double check the specific category is also active
      });
      
      if (selectedCategory) {
        filter.category = selectedCategory._id;
      } else {
        // If the category doesn't exist or is inactive, return empty array immediately
        return NextResponse.json([]);
      }
    }

    if (isFeatured === 'true') {
      filter.isFeatured = true;
    }

    const products = await Product.find(filter)
      .populate('category', 'name isActive')
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    // 1. Check Authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    const formData = await req.formData();
    
    // 2. Extract multiple files using .getAll()
    // This matches the 'images' key we used in the frontend formData.append
    const files = formData.getAll('images'); 
    const name = formData.get('name');

    // 3. Upload all images in parallel
    let imageUrls = [];
    if (files && files.length > 0) {
      // Promise.all handles multiple uploads at the same time for better speed
      imageUrls = await Promise.all(
        files.map((file) => uploadImage(file, "products"))
      );
    }

    // 4. Construct the Payload
    const payload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), // Improved slug logic
      description: formData.get('description'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      category: formData.get('category'),
      metalType: formData.get('metalType'),
      images: imageUrls, // Now saving the full array of Cloudinary URLs
      isActive: true,
    };

    const product = await Product.create(payload);
    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("Product Creation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}