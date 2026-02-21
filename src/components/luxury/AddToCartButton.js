"use client";
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react"; // Use the Hook, not the Server function
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation

export default function AddToCartButton({ product }) {
  const { data: session, status } = useSession(); // Get session on client side
  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    // 1. Check if user is logged in
    if (status === "unauthenticated") {
      toast.error("Please login to add items to your bag");
      router.push("/login");
      return;
    }
    setLoading(true);
    addToCart(product);
    toast.success("Added to Cart Successfully!")
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="w-full bg-stone-900 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-800 active:scale-95 disabled:bg-stone-300 font-bold shadow-lg"
    >
      {loading ? 'Adding to Collection...' : 'Add to Shopping Bag'}
    </button>
  );
}