import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product._id}`} className="group block relative">
      <div className="relative flex flex-col transition-all duration-500 ease-in-out border border-stone-300 group-hover:border-gold/50 rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl">
        
        {/* Image Container - Using a consistent Aspect Ratio */}
        <div className="relative aspect-4/5 overflow-hidden bg-[#fbfaf8]">
          <img
            src={product.images[0] || 'https://via.placeholder.com/400x500'}
            alt={product.name}
            className={`h-full w-full object-cover transition-all duration-1000 ease-out 
              ${product.images[1] ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
          />

          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} detail`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:scale-105"
            />
          )}

          {/* Optional: Discount Badge */}
          {/* {product.oldPrice && (
            <div className="absolute top-2 left-2 bg-black text-white text-[8px] md:text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
              Sale
            </div>
          )} */}
        </div>

        {/* Content Section - Clean & Minimal */}
        <div className="p-3 md:p-5 text-center flex flex-col items-center">
          <h3 className="text-xs md:text-sm lg:text-base font-serif text-stone-800 group-hover:text-gold transition-colors duration-300 tracking-tight leading-tight line-clamp-1">
            {product.name}
          </h3>

          <div className="mt-2 md:mt-3 flex items-center justify-center gap-2">
            {/* {product.oldPrice && (
              <span className="text-[10px] md:text-xs text-stone-400 line-through">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
            )} */}
            <p className="text-xs md:text-sm font-bold tracking-widest text-gold">
              Rs. {product.price?.toLocaleString()}
            </p>
          </div>
          
          {/* Decorative line that grows on hover */}
          <div className="w-0 h-px bg-gold mt-3 transition-all duration-500 group-hover:w-12" />
        </div>
      </div>
    </Link>
  );
}