"use client";
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 300;
  const totalAmount = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-stone-50 p-8 rounded-full mb-6 border border-stone-100">
          <ShoppingBag size={48} className="text-gold stroke-[1px]" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl mb-2 text-stone-800">Your bag is empty</h2>
        <p className="text-stone-500 mb-8 max-w-xs text-sm">
          Luxury is waiting. Add some masterpieces to your collection.
        </p>
        <Link
          href="/"
          className="bg-stone-900 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft size={14} /> Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-20">
      <h1 className="font-serif text-3xl md:text-4xl mb-8 md:mb-12 text-stone-900">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 items-start">
        
        {/* Item List */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-4 md:gap-6 border-b border-stone-300 pb-6 md:pb-8">
              {/* Image */}
              <div className="h-32 w-24 md:h-44 md:w-36 shrink-0 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
                <img src={item.images[0]} className="h-full w-full object-cover" alt={item.name} />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between py-1">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-serif text-base md:text-xl text-stone-800 line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest mt-1">{item.metalType || "Fine Polish"}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-stone-500 hover:text-red-500 transition-colors p-1">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-stone-200 rounded-full px-2 py-1 gap-4">
                    <button 
                      onClick={() => updateQuantity(item._id, -1)}
                      className="text-stone-500 hover:text-gold transition-colors p-1"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, 1)}
                      className="text-stone-500 hover:text-gold transition-colors p-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-stone-400 line-through">
                      {item.quantity > 1 ? `Rs. ${item.price.toLocaleString()}` : ""}
                    </p>
                    <p className="font-medium text-sm md:text-lg text-stone-900">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Container - Sticky on Desktop */}
        <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-100 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl md:text-2xl mb-6 text-stone-800">Order Summary</h2>
          
          <div className="space-y-4 border-b border-stone-200 pb-6 mb-6">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>Delivery Charges</span>
              <span className="text-gold font-bold">Rs. {shipping}</span>
            </div>
          </div>

          <div className="flex justify-between text-lg md:text-xl font-bold mb-8 text-stone-900">
            <span>Total</span>
            <span>Rs. {totalAmount.toLocaleString()}</span>
          </div>

          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-stone-900 py-4 px-2 md:py-5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] text-white hover:bg-stone-800 transition-all shadow-xl active:scale-95"
          >
            Checkout Securely <ArrowRight size={16} />
          </Link>
          
          <p className="text-center mt-6 text-[9px] uppercase tracking-widest text-stone-400">
            Secure Encrypted Payments
          </p>
        </div>

      </div>
    </div>
  );
}