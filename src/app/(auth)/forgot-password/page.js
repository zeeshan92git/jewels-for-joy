"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, Send } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic frontend email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid boutique email.");
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      if (res.ok) {
        setIsSent(true);
        toast.success("Reset link sent to your email.");
      } else {
        const data = await res.json();
        toast.error(data.message || "Unable to process request.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      <div className="max-w-md w-full bg-white border border-stone-300 p-8 md:p-10 shadow-sm rounded-xl">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl mb-3 text-stone-900 italic">
            Access <span className="text-gold not-italic">Recovery</span>
          </h1>
          <p className="text-stone-400 text-[11px] font-medium uppercase tracking-[0.2em] leading-relaxed">
            Provide your registered email to receive a secure reset link.
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <Input
                label="Email Address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-stone-300 focus:border-gold rounded-none outline-none h-12 pt-4 bg-transparent"
              />
              <Mail className="absolute right-0 bottom-3 text-gold" size={18} />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-black text-white rounded-none uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-gold hover:text-amber-400 transition-all duration-500 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>Send Secure Link <Send size={14} /></>
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="h-20 w-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto border border-stone-100">
              <Mail className="text-gold" size={32} />
            </div>
            <div className="space-y-2">
              <p className="font-serif text-xl text-stone-800">Check your inbox</p>
              <p className="text-stone-500 text-[12px] leading-relaxed">
                If an account is associated with <b>{email}</b>, we have sent a secure recovery link.
              </p>
            </div>
            <button 
              onClick={() => setIsSent(false)}
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-gold transition-colors"
            >
              Didn't receive it? Try again
            </button>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-10 pt-6 border-t border-stone-50 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest hover:text-black transition-all"
          >
            <ArrowLeft size={12} /> Return to Sign In
          </Link>
        </div>
      </div>

      <p className="mt-12 text-[9px] text-gold uppercase tracking-[0.5em]">
        Jewels For Joy • Private Security
      </p>
    </div>
  );
}