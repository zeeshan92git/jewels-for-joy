"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProductModalWrapper({ children }) {
  const router = useRouter();
  const overlayRef = useRef(null);

  // 1. Lock background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 2. Close modal if user clicks the dark background area
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      router.back();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10 lg:p-16 animate-in fade-in duration-300"
      style={{ zIndex: 9999 }} // Ensures it is above the Navbar (usually z-50)
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300">
        {children}
      </div>
    </div>
  );
}