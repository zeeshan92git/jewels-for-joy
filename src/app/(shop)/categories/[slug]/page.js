import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ProductCard from '@/components/luxury/ProductCard';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }) {
  await dbConnect();
  const { slug } = await params;

  // 1. Find the category
  const category = await Category.findOne({ slug });

  if (!category) notFound();

  // 2. Fetch products belonging to this category
  const products = await Product.find({ category: category._id, isActive: true }).lean();

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16 min-h-[70vh]">
      {/* Responsive Header */}
      <header className="mb-10 md:mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
           <div className="h-px w-6 md:w-10 bg-gold/30" />
           <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Collection</span>
           <div className="h-px w-6 md:w-10 bg-gold/30" />
        </div>
        
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl capitalize tracking-tight text-stone-800">
          {category.name}
        </h1>
        
        <p className="mt-3 md:mt-4 text-xs md:text-sm text-stone-500 font-light italic max-w-xs md:max-w-none mx-auto">
          "Handcrafted elegance in every detail."
        </p>
      </header>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-stone-200 rounded-3xl">
          <p className="text-gold font-serif italic text-lg">
            Our {category.name} collection is being curated...
          </p>
          <p className="text-stone-400 text-xs mt-2 uppercase tracking-widest">Stay tuned for new arrivals</p>
        </div>
      ) : (
        /* Grid: 2 columns on mobile, 3 on tablets, 4 on large desktops */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {products.map((product) => (
            <ProductCard 
              key={product._id.toString()} 
              product={JSON.parse(JSON.stringify(product))} 
            />
          ))}
        </div>
      )}
    </div>
  );
}