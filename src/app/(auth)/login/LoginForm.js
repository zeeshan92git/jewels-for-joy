"use client";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // If already logged in, redirect automatically
  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid Credentials");
      setLoading(false);
      return;
    }

    toast.success("Login Successful!");

    // 🔥 Get updated session
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    setTimeout(() => {
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();
    }, 200);

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">

      <div className="max-w-md w-full bg-white border border-stone-400 p-5 md:p-7 shadow-sm rounded-sm">
        <div className="text-center mb-10">
          {/* Circular Branding Logo (Optional - matches your Navbar style) */}
          <div className="mx-auto h-24 w-24 rounded-full bg-black flex items-center justify-center mb-6 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dophfzeep/image/upload/v1768305467/Gemini_Generated_Image_t1w5ilt1w5ilt1w5-removebg-preview_fawjhk.png"
              alt="Jewel for Joy"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="font-serif text-4xl mb-3 tracking-tight text-stone-900">Sign In</h1>
          <p className="text-stone-400 text-[13px] font-light uppercase tracking-widest">
            Access your curated collection
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="border-b border-stone-400 focus:border-black rounded-none outline-none h-12 w-full"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Password</label>

              <Link
                href="/forgot-password"
                className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-amber-400 hover:font-bold transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <Input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="h-12 w-full border-b border-stone-400 focus:border-black rounded-none outline-none"
            />

          </div>

          <Button
            style={{ backgroundColor: 'black', color: 'white' }}
            className="w-full mt-6 h-14 rounded-none uppercase text-xs tracking-[0.3em] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            {loading ? "Processing..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-stone-50">
          <p className="text-[11px] text-gold uppercase tracking-widest">
            New to Jewels for Joy?
          </p>
          <Link
            href="/register"
            className="mt-3 block text-xs text-stone-900 font-bold uppercase tracking-widest hover:text-[#D4AF37] hover:underline transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-10 text-[10px] text-gold uppercase tracking-[0.4em]">
        Handcrafted with Passion • 2025
      </p>
    </div>
  );
}