"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation Logic
  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    // 1. Name Check
    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }

    // 2. Email Regex Check (Standard email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // 3. Password Length Check
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // 4. Password Match Check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Run Validation
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success("Account created! Please sign in.");
      router.push('/login');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      <div className="max-w-md w-full bg-white border border-stone-400 p-5 md:p-7 shadow-sm rounded-sm">
        <div className="text-center mb-10">
          <div className="mx-auto h-24 w-24 rounded-full bg-black flex items-center justify-center mb-6 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dophfzeep/image/upload/v1768305467/Gemini_Generated_Image_t1w5ilt1w5ilt1w5-removebg-preview_fawjhk.png"
              alt="Jewel for Joy"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="font-serif text-4xl mb-3 tracking-tight text-stone-900">Create Account</h1>
          <p className="text-stone-400 text-[13px] font-light uppercase tracking-widest">
            Join the world of elegance
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest text-center font-bold animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            type="text"
            required
            autoComplete="name"
            onChange={handleChange}
            className="border-b border-stone-400 focus:border-black rounded-none outline-none h-11"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            autoComplete="email"
            onChange={handleChange}
            className="border-b border-stone-400 outline-none focus:border-black rounded-none h-11"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            onChange={handleChange}
            className="border-b border-stone-400 focus:border-black outline-none rounded-none h-11"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            onChange={handleChange}
            className="border-b border-stone-400 focus:border-black outline-none rounded-none h-11"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 h-14 rounded-none uppercase text-xs tracking-[0.3em] bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-stone-50">
          <p className="text-[11px] text-gold uppercase tracking-widest">
            Already have an account?
          </p>
          <Link
            href="/login"
            className="mt-3 block text-xs text-stone-900 font-bold uppercase tracking-widest hover:text-[#D4AF37] hover:underline transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      <p className="mt-10 text-[10px] text-gold uppercase tracking-[0.4em]">
        Handcrafted with Passion • 2025
      </p>
    </div>
  );
}