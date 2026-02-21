"use client";
import { useState } from 'react';

export default function ProductImageGallery({ images, name }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full group mx-auto">
      {/* Main Image Wrapper */}
      <div className="relative p-1 md:p-1.5 border border-stone-200 rounded-4xl md:rounded-[2.5rem] bg-white shadow-sm overflow-hidden">
        <div className="relative aspect-4/5 overflow-hidden rounded-[1.8rem] md:rounded-[2.1rem] bg-stone-50">
          <img
            src={images[current]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Nav Arrows - Optimized for touch */}
          {images.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-10 flex justify-between pointer-events-none">
               <button 
                onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
                className="pointer-events-auto bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg lg:opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
               </button>
               <button 
                onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
                className="pointer-events-auto bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg lg:opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails - Hidden Scrollbar Logic */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`relative shrink-0 w-12 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                current === idx ? 'border-gold scale-105' : 'border-transparent opacity-60'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}