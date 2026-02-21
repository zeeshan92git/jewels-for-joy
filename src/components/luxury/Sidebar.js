"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X, Phone, Info, Truck, FileText, User, LogOut, LogIn } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";

export default function Sidebar({ isOpen, onClose }) {
    const { data: session } = useSession();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Prevent body scroll when sidebar is active
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            {/* Background Overlay - High Z-index to cover Navbar */}
            <div
                className={`fixed inset-0 z-100 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar Panel - Responsive Width */}
            <div className={`fixed top-0 left-0 z-110 h-full w-[75%] sm:w-72 md:w-80 bg-white text-black shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>

                {/* Header - Fixed Height for consistency */}
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-stone-100 shrink-0 bg-white">
                    <Link href="/" onClick={onClose}>
                        <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-black overflow-hidden ring-1 ring-gold/20">
                            <img
                                src="https://res.cloudinary.com/dophfzeep/image/upload/v1768305467/Gemini_Generated_Image_t1w5ilt1w5ilt1w5-removebg-preview_fawjhk.png"
                                alt="Jewels for Joy"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </Link>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                    >
                        <X size={24} className="text-stone-800" />
                    </button>
                </div>

                {/* Navigation Content - Scrollable with Custom Scrollbar */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="py-2">
                        {isLoading ? (
                            <div className="p-8 text-center">
                                <div className="animate-pulse flex flex-col items-center gap-4">
                                    <div className="h-4 w-3/4 bg-gold rounded"></div>
                                    <div className="h-4 w-1/2 bg-gold rounded"></div>
                                </div>
                            </div>
                        ) : categories.length > 0 ? (
                            categories.map((category) => (
                                <SidebarItem
                                    key={category._id}
                                    href={`/categories/${category.slug || category.name.toLowerCase()}`}
                                    label={category.name}
                                    img={category.image || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500"}
                                    onClose={onClose}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-sm text-stone-400">Our collections are being updated.</div>
                        )}
                    </div>

                    <div className="mt-4 px-2">
                        <div className="h-px w-full bg-stone-100 mb-4" />
                        <LinkIcon href="/contact" icon={<Phone size={18} />} label="Contact Us" onClose={onClose} />
                        <LinkIcon href="/about" icon={<Info size={18} />} label="About Us" onClose={onClose} />
                    </div>
                </div>

                {/* Mobile Footer Inside Sidebar (Optional but helpful) */}
                <div className="p-6 bg-stone-50 border-t border-stone-100">
                    <p className="text-[10px] uppercase tracking-widest text-gold text-center">
                        © 2025 Jewels For Joy
                    </p>
                </div>
            </div>
        </>
    );
}

function SidebarItem({ href, label, img, onClose }) {
    return (
        <Link href={href} onClick={onClose} className="flex items-center gap-4 px-6 py-4 border-b border-stone-50 hover:bg-stone-50 transition-all group">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-stone-200">
                <img src={img} alt={label} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-stone-800 group-hover:text-gold transition-colors">
                {label}
            </span>
        </Link>
    );
}

function LinkIcon({ href, icon, label, onClose }) {
    return (
        <Link href={href} onClick={onClose} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-all group">
            <div className="text-stone-400 group-hover:text-gold transition-colors">{icon}</div>
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-stone-600 group-hover:text-stone-900 transition-colors">
                {label}
            </span>
        </Link>
    );
}