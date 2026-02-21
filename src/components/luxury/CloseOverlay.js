"use client";
import { useRouter } from "next/navigation";

export default function CloseOverlay() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="p-2 rounded-full bg-stone-100 text-stone-900 hover:bg-gold hover:text-white transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
}