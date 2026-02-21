"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { User, ShieldCheck, LogOut, Settings } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#faf9f6] flex flex-col items-center justify-center p-4 md:p-6">
      <div className="max-w-md w-full bg-white border border-stone-300 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-stone-200/50">
        
        {/* Avatar Section */}
        <div className="text-center mb-10">
          <div className="relative mx-auto h-24 w-24 mb-6">
            <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse" />
            <div className="relative h-full w-full rounded-full bg-stone-900 flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-4xl font-serif text-gold">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <h1 className="font-serif text-3xl text-stone-900 tracking-tight">My <span className="text-gold italic">Profile</span></h1>
          <p className="text-stone-400 text-[9px] uppercase tracking-[0.4em] mt-3 font-bold">Exclusive Member</p>
        </div>

        {/* Info Grid */}
        <div className="space-y-6 border-t border-stone-100 pt-8">
          <div className="flex flex-col gap-1 border-b border-stone-50 pb-4">
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Full Name</span>
            <span className="text-stone-800 font-medium text-lg tracking-tight">{session?.user?.name}</span>
          </div>

          <div className="flex flex-col gap-1 border-b border-stone-50 pb-4">
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Email Address</span>
            <span className="text-stone-800 font-medium text-sm break-all">{session?.user?.email}</span>
          </div>

          <div className="flex items-center justify-between bg-stone-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold" />
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Account Tier</span>
            </div>
            <span className="text-[10px] px-3 py-1 bg-white border border-stone-200 text-stone-900 font-bold rounded-full shadow-sm">
              {session?.user?.role === 'admin' ? 'Curator (Admin)' : 'Collector (User)'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3">
          {session?.user?.role === 'admin' && (
            <button 
              onClick={() => router.push('/admin')}
              className="w-full bg-stone-900 text-white rounded-full py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold transition-all shadow-lg active:scale-95"
            >
              <Settings size={14} /> Enter Admin Studio
            </button>
          )}
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full border border-stone-200 text-stone-400 rounded-full py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[8px] text-gold font-bold uppercase tracking-[0.5em]">Jewels for Joy • Established 2025</p>
        </div>
      </div>
    </div>
  );
}