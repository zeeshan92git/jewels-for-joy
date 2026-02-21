"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Truck, Package, ShieldCheck } from 'lucide-react';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const orderIdShort = orderId?.slice(-8).toUpperCase() || "NEW-ORDER";

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-10 px-4 md:px-6 bg-[#faf9f6]">
            <div className="max-w-4xl w-full">
                
                {/* Main Card */}
                <div className="bg-white rounded-4xl md:rounded-[3rem] p-8 md:p-16 border border-stone-300 shadow-2xl shadow-stone-200/50 text-center relative overflow-hidden">
                    
                    {/* Decorative Background sparkle (Subtle) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gold shadow-[0_0_30px_#AF9164]" />

                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <CheckCircle2 size={80} className="text-gold stroke-[0.5px]" />
                            <div className="absolute inset-0 rounded-full border border-gold/10 animate-ping" />
                        </div>
                    </div>

                    <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-4">
                        Thank <span className="text-gold italic font-light">You.</span>
                    </h1>
                    <p className="text-stone-400 text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-10">
                        Order Confirmed — #{orderIdShort}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 rounded-2xl bg-stone-200 border border-stone-100">
                            <Package className="text-gold mx-auto mb-3" size={24} />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-800 mb-1">Curation</p>
                            <p className="text-[10px] text-stone-500">1-2 Business Days</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-stone-200 border border-stone-100">
                            <Truck className="text-gold mx-auto mb-3" size={24} />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-800 mb-1">Shipping</p>
                            <p className="text-[10px] text-stone-500">3-5 Day Nationwide</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-stone-200 border border-stone-100">
                            <ShieldCheck className="text-gold mx-auto mb-3" size={24} />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-800 mb-1">Authentic</p>
                            <p className="text-[10px] text-stone-500">Jewels for Joy Quality</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/" className="px-12 py-5 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-lg flex items-center justify-center gap-2">
                            Return to Boutique <ArrowRight size={14} />
                        </Link>
                        <Link href="/orders" className="px-12 py-5 border border-stone-200 text-stone-400 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:border-stone-900 hover:text-stone-900 transition-all">
                            Order History
                        </Link>
                    </div>

                    <div className="mt-16 pt-8 border-t border-stone-100">
                        <p className="text-[9px] text-gold tracking-[0.5em] font-medium uppercase">
                            Jewels for Joy • 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}