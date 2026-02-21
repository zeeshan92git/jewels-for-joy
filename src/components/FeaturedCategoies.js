"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of view
      const scrollTo = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="h-40 flex items-center justify-center text-stone-400 italic font-serif">Curating Collections...</div>;

  return (
    <section className="py-12 md:py-16 px-4 w-full max-w-7xl mx-auto relative overflow-hidden">
      {/* Heading - Scaled for Mobile */}
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
        <div className="h-px w-8 md:w-20 bg-gold" />
        <h2 className="text-xl md:text-3xl text-gold tracking-tight font-bold text-center">
          Featured Categories
        </h2>
        <div className="h-px w-8 md:w-20 bg-gold" />
      </div>

      <div className="relative group">
        {/* Arrows - Hidden on touch devices to save space */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 text-stone-400 hover:text-gold transition-colors hidden lg:block bg-white/80 rounded-full shadow-sm"
          aria-label="Scroll Left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Scroll Container - Improved snap and sizing */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-10 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory items-start touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/categories/${category.slug || category._id}`}
              className="shrink-0 snap-center first:pl-2 last:pr-2 group/item"
            >
              <div className="flex flex-col items-center gap-3 md:gap-5">
                {/* RESPONSIVE SIZE: 
                   w-28 (112px) on mobile
                   w-36 (144px) on small tablets
                   w-52 (208px) on desktop 
                */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 rounded-full bg-[#F9F9F9] overflow-hidden transition-all duration-700 group-hover/item:shadow-xl border border-stone-100 flex items-center justify-center">
                  <div className="relative w-full h-full transform transition-transform duration-700 group-hover/item:scale-110">
                    <img
                      src={category.image || '/placeholder-jewelry.png'}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Subtle Polish */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.03)_100%)] pointer-events-none rounded-full" />
                </div>

                {/* Category Name - Adjusted size */}
                <h3 className="font-serif text-[10px] md:text-sm lg:text-base text-stone-800 tracking-widest transition-colors group-hover/item:text-gold uppercase text-center px-2">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 text-stone-400 hover:text-gold transition-colors hidden lg:block bg-white/80 rounded-full shadow-sm"
          aria-label="Scroll Right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}