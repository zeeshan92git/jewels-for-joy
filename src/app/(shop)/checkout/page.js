"use client";
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-stone-50 p-8 rounded-full mb-6 border border-stone-100">
          <ShoppingBag size={48} className="text-stone-300 stroke-[1px]" />
        </div>
        <h2 className="font-serif text-3xl mb-2 text-stone-800">Your bag is empty</h2>
        <Link href="/" className="bg-stone-900 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-2 shadow-lg">
          <ArrowLeft size={16} /> Back to Collections
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = paymentMethod === 'Advance' ? subtotal * 0.05 : 0;
  const finalTotal = subtotal - discount;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("Finalizing your order...");

    try {
      const formData = new FormData(e.target);
      formData.append('paymentMethod', paymentMethod);
      formData.append('totalAmount', finalTotal);
      formData.append('items', JSON.stringify(cart));

      const res = await fetch('/api/orders/checkout', { method: 'POST', body: formData });
      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error || "Failed to place order");

      toast.success("Order Placed Successfully!", { id: t });
      clearCart();
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch (err) {
      toast.error(err.message, { id: t });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Form Fields */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-stone-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
              <h2 className="font-serif text-2xl text-stone-800">Shipping Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <input name="fullName" required placeholder="Full Name" className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold transition-all text-sm" />
              <input name="phone" required placeholder="WhatsApp / Phone Number" className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold transition-all text-sm" />
              <textarea name="address" required placeholder="Complete Residential Address" className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold transition-all text-sm resize-none h-28" />
              <div className="grid grid-cols-2 gap-4">
                <input name="city" required placeholder="City" className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold text-sm" />
                <input name="postalCode" placeholder="Postal Code" className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold text-sm" />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-stone-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
              <h2 className="font-serif text-2xl text-stone-800">Payment Method</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`flex flex-col p-5 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-stone-200 bg-white'}`}>
                <div className="flex justify-between items-start mb-2">
                  <input type="radio" name="payType" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-gold mt-1" />
                  <ShieldCheck size={20} className={paymentMethod === 'COD' ? 'text-gold' : 'text-stone-300'} />
                </div>
                <p className="font-bold text-sm text-stone-800 uppercase tracking-tight">Cash on Delivery</p>
                <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-widest font-medium">Pay at your doorstep</p>
              </label>

              <label className={`flex flex-col p-5 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'Advance' ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-stone-200 bg-white'}`}>
                <div className="flex justify-between items-start mb-2">
                  <input type="radio" name="payType" value="Advance" checked={paymentMethod === 'Advance'} onChange={() => setPaymentMethod('Advance')} className="accent-gold mt-1" />
                  <CreditCard size={20} className={paymentMethod === 'Advance' ? 'text-gold' : 'text-stone-300'} />
                </div>
                <p className="font-bold text-sm text-stone-800 uppercase tracking-tight">Direct Transfer</p>
                <p className="text-[10px] text-green-600 mt-1 uppercase tracking-widest font-bold">Exclusive 5% Discount</p>
              </label>
            </div>

            {paymentMethod === 'Advance' && (
              <div className="mt-6 p-6 bg-stone-900 rounded-3xl text-white shadow-2xl transition-all animate-in fade-in slide-in-from-top-4">
                <h4 className="font-serif text-lg text-gold mb-4">Bank Account Details</h4>
                <div className="space-y-3 text-xs md:text-sm font-light opacity-90 tracking-wide">
                  <div className="flex justify-between border-b border-white/10 pb-2"><span>Bank</span> <span className="font-bold">Meezan Bank</span></div>
                  <div className="flex justify-between border-b border-white/10 pb-2"><span>Title</span> <span className="font-bold uppercase tracking-tight">Ashal Yousaf</span></div>
                  <div className="flex justify-between border-b border-white/10 pb-2"><span>Account</span> <span className="font-bold tracking-widest">04260105184492</span></div>
                </div>
                <div className="mt-6">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-3">Proof of Payment</p>
                  <input type="file" name="screenshot" accept="image/*" required className="block w-full text-[10px] text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-gold file:text-white hover:file:bg-white hover:file:text-stone-900 file:transition-all" />
                </div>
              </div>
            )}
          </section>

          <button disabled={loading} className="w-full bg-stone-900 text-white py-5 rounded-full hover:bg-gold transition-all font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl disabled:bg-stone-300">
            {loading ? "Confirming Order..." : "Complete Purchase"}
          </button>
        </form>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-100 lg:sticky lg:top-24">
            <h3 className="font-serif text-2xl mb-6 text-stone-800">Order Summary</h3>
            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide mb-6">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-16 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-stone-100">
                    <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-serif text-stone-800 line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-stone-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 border-t border-stone-200 pt-6">
              <div className="flex justify-between text-sm text-stone-500 font-light">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              {paymentMethod === 'Advance' && (
                <div className="flex justify-between text-sm text-green-600 font-bold">
                  <span>Advance Discount (5%)</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-stone-900 pt-2 border-t border-stone-100 mt-2">
                <span>Total Due</span>
                <span className="text-stone-900 font-serif tracking-tighter text-2xl">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}