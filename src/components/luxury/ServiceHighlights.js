import { Truck, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServiceHighlights() {
  const features = [
    {
      icon: <Sparkles size={32} className='text-white' />,
      title: "Anti-Tarnish Polish",
      desc: "Premium PVD coating ensures long-lasting shine."
    },
    {
      icon: <ShieldCheck size={32} className='text-white' />,
      title: "Skin Friendly",
      desc: "100% Hypoallergenic & Nickel-free materials."
    },
    {
      icon: <Truck size={32} className='text-white' />,
      title: "Swift Delivery",
      desc: "Across Pakistan in 3-5 working days."
    }
  ];

  return (
    <section className="bg-stone-50 py-12 md:py-20 border-y border-gold">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Responsive Grid: 1 col on mobile, 3 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              
              {/* Icon Container with responsive sizing */}
              <div className="mb-5 p-4 md:p-5 rounded-full bg-gold border border-stone-100 text-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>

              {/* Title - adjusted font size for mobile screens */}
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-900 mb-2 uppercase tracking-tight">
                {feature.title}
              </h3>

              {/* Description - added max-width to prevent awkward text stretching */}
              <p className="text-xs md:text-sm text-stone-600 font-medium tracking-wide max-w-62.5 leading-relaxed">
                {feature.desc}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}