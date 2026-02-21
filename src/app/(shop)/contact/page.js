"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Message sent! We will contact you soon.');
        e.target.reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Information */}
          <div>
            <h1 className="font-serif text-5xl mb-8 tracking-tighter uppercase">Contact <span className='text-gold'>Us</span></h1>
            <p className="text-stone-500 mb-12 font-light leading-relaxed">
              Have a question about our collections or need assistance with an order? 
              Our concierge team is here to help you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full"><Mail size={20} className="text-stone-900" /></div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold text-stone-400">Email</h4>
                  <p className="text-stone-900">jewelsforjoyoff@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full"><Phone size={20} className="text-stone-900" /></div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold text-stone-400">WhatsApp</h4>
                  <p className="text-stone-900">+92 315 1181090</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full"><MapPin size={20} className="text-stone-900" /></div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold text-stone-400">Shop</h4>
                  <p className="text-stone-900">Kiosk-1 2nd Floor Opposite Naqshi Centaurus Mall F-8/4 Islamabad, Pakistan</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-stone-50 p-8 md:p-12 rounded-sm border border-stone-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                name="name" 
                placeholder="Full Name" 
                required 
                className="w-full bg-transparent border-b border-stone-300 py-3 focus:border-black transition-colors outline-none text-sm"
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                required 
                className="w-full bg-transparent border-b border-stone-300 py-3 focus:border-black transition-colors outline-none text-sm"
              />
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows="4" 
                required 
                className="w-full bg-transparent border-b border-stone-300 py-3 focus:border-black transition-colors outline-none text-sm resize-none"
              ></textarea>
              
              <Button 
                disabled={loading}
                className="w-full py-4 bg-black text-white  hover:text-amber-400 transition-all duration-500 uppercase text-xs tracking-widest flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : <>Send Message <Send size={14} /></>}
              </Button>
              
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}