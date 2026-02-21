import Link from 'next/link';
import { BellRing } from 'lucide-react';

export default function Footer() {
  const categories = ['Rings', 'Necklaces', 'Bangles', 'Lockets', 'Bracelets'];

  const customerCare = [
    { name: 'About Us', link: '/about' },
    { name: 'Contact Us', link: '/contact' },
    { name: 'Track Your Order', link: '/orders' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Size Chart', link: '/size-chart' }
  ];

  return (
    <footer className="bg-black text-white">
      {/* 1. Brand Description & WhatsApp Section */}
      <div className="py-12 md:py-20 px-4 md:px-6 text-center bg-white text-black border-b border-stone-200">
        <div className="mx-auto max-w-4xl flex flex-col items-center">

          {/* Brand Logo: Adjusted h-32 on mobile to h-52 on md+ */}
          <div className="relative mb-6 md:mb-8 h-32 w-32 md:h-52 md:w-52 rounded-full bg-black overflow-hidden shadow-2xl border-4 border-stone-50">
            <img
              className="absolute inset-0 h-full w-full object-cover brightness-110"
              src="https://res.cloudinary.com/dophfzeep/image/upload/v1768305467/Gemini_Generated_Image_t1w5ilt1w5ilt1w5-removebg-preview_fawjhk.png"
              alt="Jewels for Joy"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-serif mb-4 tracking-tight uppercase text-stone-900">
            Jewels <span className='text-gold'>for</span> Joy
          </h2>

          <p className="text-stone-500 leading-relaxed max-w-2xl text-xs md:text-base font-light mb-8 md:mb-10">
            Jewels for Joy is a Pakistani artificial jewellery brand offering bridal jewellery,
            bangles, earrings, and fashion accessories for weddings and everyday wear.
          </p>

          {/* --- WHATSAPP CHANNEL SECTION --- */}
          <div className="flex flex-col items-center gap-4 p-5 md:p-8 bg-stone-100 rounded-2xl border border-stone-200 w-full max-w-sm md:max-w-md mx-auto shadow-sm">
            <h4 className="text-stone-900 font-serif text-lg">Join Our Community</h4>
            <p className="text-stone-500 text-[10px] md:text-[11px] uppercase tracking-widest text-center">
              Early access & styling tips.
            </p>

            <a
              href="https://whatsapp.com/..."
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full text-[10px] font-bold uppercase w-full sm:w-auto transition-transform active:scale-95"
            >
              <BellRing size={14} />
              Join WhatsApp Channel
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      {/* Grid: 1 column on mobile, 2 on sm, 3 on lg */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4">

        {/* Categories */}
        <div className="flex flex-col">
          <div className="inline-block sm:block text-left"> {/* Wrapper to keep text left-aligned even when container is centered */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-gold">
              Top Categories
            </h4>
            <ul className="space-y-3 text-[12px] text-stone-400">
              {categories.map(item => (
                <li key={item} className="flex items-center gap-3 group">
                  <span className="text-gold opacity-50 w-2 shrink-0">•</span>
                  <Link href={`/categories/${item.toLowerCase()}`} className="hover:text-white transition-colors whitespace-nowrap">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Customer Care */}
        <div className="flex flex-col">
          <div className="inline-block sm:block text-left"> {/* Wrapper to keep text left-aligned even when container is centered */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-gold">
              Customer Care
            </h4>
            <ul className="space-y-3 text-[12px] text-stone-400">
              {customerCare.map(item => (
                <li key={item.name} className="flex items-center gap-3 group">
                  <span className="text-gold opacity-50 w-2 shrink-0">•</span>
                  <Link href={item.link} className="hover:text-white transition-colors whitespace-nowrap">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Social Media Handlers */}
        <div className="flex flex-col items-center sm:items-start col-span-1 sm:col-span-2 lg:col-span-1">
          <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 text-gold">Follow Us</h4>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {[
              { icon: "facebook", url: "https://www.facebook.com/profile.php?id=61586833774493", img: "https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" },
              { icon: "instagram", url: "https://www.instagram.com/jewelsforjoy_official", img: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" },
              { icon: "tiktok", url: "https://www.tiktok.com/@jewelsforjoy_official", img: "https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg" },
              { icon: "youtube", url: "https://www.youtube.com/@JewelsforJoy-official", img: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center hover:bg-white transition-all duration-500 group overflow-hidden"
              >
                <img src={social.img} alt={social.icon} className="h-5 w-5 object-contain group-hover:invert-0" />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="border-t border-stone-900 py-8 md:py-12 px-4 text-center">
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-stone-500 font-medium leading-loose">
          © 2025 <span className="text-gold font-serif">Jewels for Joy</span> <br className="sm:hidden" />  Pakistan's Finest Artificial Jewellery
        </p>
      </div>

    </footer>
  );
}