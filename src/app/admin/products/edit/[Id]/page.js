import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import EditProductForm from '@/app/admin/EditProductForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default async function EditProductPage({ params }) {
  await dbConnect();
  
  // Await params as required in newer Next.js versions
  const { Id } = await params;

  const product = await Product.findById(Id).lean();
  const categories = await Category.find({}).lean();

  if (!product) notFound();

  // Serialize MongoDB data to plain JSON for Client Component
  const serializedProduct = JSON.parse(JSON.stringify(product));
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Premium Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-2">
          <Link 
            href="/admin/products" 
            className="inline-flex items-center gap-2 text-stone-400 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
          >
            <ArrowLeft size={14} /> Back to Vault
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight">
            Refine <span className="text-gold italic">Masterpiece</span>
          </h1>
          <div className="flex items-center gap-2 text-stone-500">
            <Sparkles size={14} className="text-gold/50" />
            <p className="text-xs italic">Currently editing: <span className="font-medium text-stone-800">{product.name}</span></p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-stone-100 shadow-sm w-fit">
          <div className={`h-2 w-2 rounded-full animate-pulse ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600">
            {product.stock > 0 ? 'In Stock' : 'Sold Out'}
          </span>
        </div>
      </div>

      {/* The Client-Side Form Wrapper */}
      <div className="relative">
        {/* Decorative element for luxury feel */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <EditProductForm 
          initialProduct={serializedProduct} 
          categories={serializedCategories} 
        />
      </div>

      <footer className="mt-12 pt-8 border-t border-stone-100 text-center">
        <p className="text-[9px] text-stone-300 uppercase tracking-[0.4em]">
          Jewels for Joy Admin Portal • Product ID: {serializedProduct._id}
        </p>
      </footer>
    </div>
  );
}