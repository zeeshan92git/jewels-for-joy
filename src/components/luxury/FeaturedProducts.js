import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from './ProductCard';

export default async function FeaturedProducts() {
  try {
    await dbConnect();
    const featuredItems = await Product.find({ isActive: true }).lean();

    if (!featuredItems || featuredItems.length === 0) {
      return (
        <div className="text-center py-20 border border-dashed border-stone-200 mx-4">
          <p className="text-stone-400 italic font-serif">No featured masterpieces found.</p>
        </div>
      );
    }

    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {featuredItems.map((product) => (
            <ProductCard 
              key={product._id.toString()} 
              product={JSON.parse(JSON.stringify(product))} 
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    return <p className="text-center py-10 text-red-800">Error loading products.</p>;
  }
}