import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden my-12">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop" 
        alt="Luxury Gift Collection" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" /> {/* Dark Overlay */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="font-serif text-4xl md:text-5xl italic mb-4">The Gift Guide</h2>
        <p className="mb-8 text-stone-200 max-w-lg">
          Timeless pieces for the ones you love most. Wrapped in our signature gold box.
        </p>
        <Link 
          href="/" 
          className="group relative border  bg-white/10 px-10 py-4 text-xs uppercase tracking-widest text-gold font-semibold transition-all hover:bg-white hover:text-black backdrop-blur-sm"
        >
          Explore Gifts
        </Link>
      </div>
    </section>
  );
}