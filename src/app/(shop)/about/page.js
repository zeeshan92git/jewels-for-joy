export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-stone-900 overflow-hidden">
         <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000" 
              className="w-full h-full object-cover" 
              alt="Jewellery Craft" 
            />
         </div>
         <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 tracking-tighter italic">Our Story</h1>
            <p className="text-stone-300 text-xs uppercase tracking-[0.5em]">Jewels for Joy • Established 2026</p>
         </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-8 text-stone-900">Elegance is an Attitude</h2>
        <p className="text-stone-600 leading-relaxed text-lg font-light mb-12">
          Born out of a passion for Pakistani heritage and modern minimalism, Jewels for Joy was founded to bridge the gap between high-end bridal luxury and everyday wearable art. We believe that every woman deserves to shine, whether she is walking down the aisle or entering a boardroom.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-stone-100">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-3">Craftsmanship</h4>
            <p className="text-sm text-stone-500">Intricately detailed by master artisans in the heart of Lahore.</p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-3">Quality</h4>
            <p className="text-sm text-stone-500">Premium alloys and stones that mimic the brilliance of fine gems.</p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-3">Affordability</h4>
            <p className="text-sm text-stone-500">Luxury aesthetics made accessible for everyone.</p>
          </div>
        </div>
      </section>
    </div>
  );
}