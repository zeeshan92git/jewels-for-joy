import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-black">

      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dv7prbusi/image/upload/v1770142260/ardy-arjun-FApOxeT2NEQ-unsplash_jm6fct.jpg"
          alt="Jewels for Joy Background"
          className="h-full w-full object-cover scale-105" // slight scale prevents white edges
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/20" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 md:px-6 text-center text-white">
        
        <span className="mb-3 text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-gold font-bold">
          Established 2025
        </span>

        {/* Adjusted text sizes: text-4xl on tiny phones, 7xl on desktop */}
        <h1 className="mb-4 md:mb-6 font-serif text-4xl sm:text-5xl md:text-7xl tracking-tighter leading-[1.1] drop-shadow-2xl">
          Elegance in <br />
          <span className="italic font-light text-gold">Every Facet</span>
        </h1>

        <p className="mb-8 md:mb-10 max-w-70 sm:max-w-lg text-stone-200 text-xs md:text-base font-light leading-relaxed">
          Discover our curated collection of handcrafted jewelry, designed to bring
          brilliance to your most cherished moments.
        </p>

        <Link
          href="/"
          className="group relative border border-white/30 bg-white/10 px-8 md:px-12 py-3 md:py-4 text-[10px] md:text-xs uppercase tracking-widest text-gold font-semibold transition-all hover:bg-white hover:text-black backdrop-blur-md active:scale-95"
        >
          Shop the Collection
        </Link>
      </div>
    </section>
  );
}