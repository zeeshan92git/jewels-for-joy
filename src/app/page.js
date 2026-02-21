// page.js
import Hero from '@/components/luxury/Hero';
import FeaturedProducts from '@/components/luxury/FeaturedProducts';
import FeaturedCategories from '@/components/FeaturedCategoies';
import ServiceHighlights from '@/components/luxury/ServiceHighlights';
import PromoBanner from '@/components/luxury/PromoBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ServiceHighlights/>
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
          <div className="h-px w-8 md:w-20 bg-stone-400" />
          <h2 className="text-xl md:text-3xl text-gold tracking-tight font-bold text-center">
            Stainless Jewellery
          </h2>
          <div className="h-px w-8 md:w-20 bg-stone-400" />
        </div>
        <FeaturedProducts />
      </section>
      <PromoBanner />
    </>
  );
}
