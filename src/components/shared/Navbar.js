"use client";
import Link from 'next/link';
import { ShoppingBag, User, ShoppingCart, Menu, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Sidebar from '../luxury/Sidebar';
import CategoryBar from '../luxury/Categorybar';

export default function Navbar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const { data: session, status } = useSession();

  return (
    <>
      {/* FIX: Removed 'p-4' from here to prevent outer spacing issues.
          Kept 'sticky top-0' so it stays pinned. */}
      <nav className="sticky top-0 z-50 w-full bg-black text-white shadow-md">

        {/* TOP ROW: Branding & Main Actions */}
        {/* Added 'py-4' here instead to maintain internal spacing */}
        <div className="mx-auto flex h-16 md:h-28 max-w-7xl items-center justify-between px-4 md:px-6">

          {/* LEFT: Menu Toggle */}
          {session?.user?.role !== "admin" && (
            <div className="flex-1">
              <Menu
                className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              />
            </div>
          )}

          {/* CENTER: Branding - Scales smoothly for small screens */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-12 w-12 md:h-24 md:w-24 rounded-full bg-black overflow-hidden ring-1 ring-gold/20">
                <img
                  src="https://res.cloudinary.com/dv7prbusi/image/upload/v1769088060/jewels-for-joy/payments/n4njnvqcq4uxbstz39l4.png"
                  alt="Logo"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="hidden sm:block font-serif text-lg md:text-2xl tracking-widest uppercase">
                Jewels <span className="text-gold">for</span> Joy
              </p>
            </Link>
          </div>

          {/* RIGHT: User Actions */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            {session?.user?.role !== "admin" && (
              <>
                <Link href="/cart" title='Cart' className="relative group">
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                  {cart.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-black font-bold">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <Link href="/orders" title='Orders' className="relative group">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                </Link>
              </>
            )}

            {/* Profile & Logout */}
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" title='Profile' className="hover:text-gold transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link href="/login" title='Login' className="hover:text-gold transition-colors">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </div>

        {/* BOTTOM ROW: Dynamic Categories */}
        {session?.user?.role !== "admin" && <CategoryBar />}
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}