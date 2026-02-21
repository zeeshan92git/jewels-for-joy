import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import AddToCartButton from '@/components/luxury/AddToCartButton';
import ProductImageGallery from '@/components/luxury/ProductImageGallery';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import Link from 'next/link';

export default async function ProductDetailPage({ params }) {
  await dbConnect();
  const { Id } = await params;

  if (!mongoose.Types.ObjectId.isValid(Id)) notFound();

  const product = await Product.findById(Id).populate('category').lean();
  if (!product) notFound();

  const relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: Id },
    isActive: true
  }).limit(4).lean();

  const serializedProduct = JSON.parse(JSON.stringify(product));
  const serializedRelated = JSON.parse(JSON.stringify(relatedProducts));

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-20 bg-[#faf9f6]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-start">

        {/* Left: Gallery - Sticky on Desktop */}
        <div className="w-full lg:sticky lg:top-24">
          <ProductImageGallery
            images={serializedProduct.images}
            name={serializedProduct.name}
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col pt-2 md:pt-4">
          <nav className="mb-6 md:mb-8 flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400">
            <Link href="/" className="hover:text-gold transition-colors">House</Link>
            <span className="text-stone-300">/</span>
            <span className="text-gold truncate">{product.category?.name}</span>
          </nav>

          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight first-letter:uppercase">
            {product.name}
          </h1>

          <div className="mt-6 md:mt-8 flex items-center gap-4">
            <p className="text-2xl md:text-3xl font-light text-stone-900 tracking-tighter">
              <span className="text-[10px] uppercase text-stone-400 mr-2 tracking-widest font-sans">pkr</span>
              {product.price.toLocaleString()}
            </p>
          </div>

          <div className="mt-8 md:mt-12 space-y-8 md:space-y-10 border-t border-stone-200 pt-8 md:pt-12">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-6 bg-gold" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900">The Narrative</h4>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-stone-600 font-light italic opacity-90">
                "{product.description}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-12 mb-4">

              <div>
                <p className="text-[9px] md:text-[10px] uppercase text-stone-400 tracking-[0.2em] font-bold mb-1">Availability</p>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  <p className="text-xs md:text-sm text-stone-800">In Stock</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-16">
            <AddToCartButton product={serializedProduct} />
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS - Compact Version */}
      {serializedRelated.length > 0 && (
        <div className="mt-16 pt-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-xl text-stone-800 ">You may also like</h2>
            <div className="h-px w-12 bg-gold/20 mx-auto mt-3" />
          </div>

          {/* Max-width container to keep items small even on large screens */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {serializedRelated.map((item) => (
              <Link key={item._id} href={`/product/${item._id}`} className="group block">
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-stone-100 p-1 transition-all duration-500 group-hover:border-gold/30 bg-white">
                  <img
                    src={item.images[0]}
                    className="h-full w-full object-cover rounded-[1.2rem] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-serif text-sm text-stone-700 group-hover:text-gold transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] tracking-widest text-stone-400 mt-0.5 uppercase">
                    PKR {item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

