"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password too short");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success("Password updated successfully!");
        router.push('/login');
      } else {
        toast.error("Link invalid or expired");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full border border-stone-400 p-10 rounded-xl">
        <h1 className="font-serif text-3xl mb-8 text-center text-stone-900">Set New <span className="text-gold italic">Password</span></h1>
        <form onSubmit={handleReset} className="space-y-6">
          <Input 
            label="New Password" 
            type="password" 
            className="border-b border-stone-300 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Input 
            label="Confirm New Password" 
            type="password"
            className="border-b border-stone-300 outline-none" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <Button disabled={loading} className="w-full bg-black text-white h-14 hover:text-amber-400 uppercase tracking-[0.2em] text-[10px] font-bold">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}