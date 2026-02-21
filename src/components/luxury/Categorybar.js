"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Return null if no categories to keep the UI clean
  if (categories.length === 0) return null;

  return (
    
    <div className="hidden md:block border-t border-stone-800 py-4 w-full">
      <div className="mx-auto flex flex-wrap max-w-7xl justify-center gap-6 px-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug || category.name.toLowerCase()}`}
            className="text-white hover:text-gold transition-colors whitespace-nowrap"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}