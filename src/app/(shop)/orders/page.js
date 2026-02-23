"use client";
import { useEffect, useState } from 'react';
import { Package, Calendar, Loader2, ArrowLeft, CheckCircle, Info, XCircle, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders/user');
        const data = await res.json();
        if (res.ok) setOrders(data);
      } catch (err) {
        console.error("Error loading orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const copyOrderSummary = (order) => {
    const summary = `✨ *Jewels for Joy - Order Summary* ✨\n\n` +
      `*Order ID:* #${order._id.slice(-8).toUpperCase()}\n` +
      `*Name:* ${order.shippingAddress.fullName}\n` +
      `*Address:* ${order.shippingAddress.address}\n` +
      `*Date:* ${new Date(order.createdAt).toLocaleDateString()}\n` +
      `*Status:* ${order.status}\n` +
      `*Payment Method:* ${order.paymentMethod}\n` +
      `*Total Amount:* PKR ${order.totalAmount.toLocaleString()}\n\n` +
      `_I am sending this order details to discuss my shipping and delivery details._`;

    navigator.clipboard.writeText(summary);
    setCopiedId(order._id);
    toast.success("Summary copied!");
    setTimeout(() => setCopiedId(null), 3000);
  };

  if (loading) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-stone-50 p-6 rounded-full mb-6">
        <Package size={48} className="text-stone-200 stroke-[1px]" />
      </div>
      <h2 className="font-serif text-2xl mb-2 text-stone-800">No orders yet</h2>
      <p className="text-stone-500 mb-8 max-w-xs text-sm italic">Your collection is waiting for its first masterpiece.</p>
      <Link href="/" className="bg-stone-900 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-2 shadow-lg">
        <ArrowLeft size={16} /> Explore Shop
      </Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <header className="mb-10 text-center md:text-left">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900">Order <span className="text-gold italic">Vault</span></h1>
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-2 font-bold">Manage your exclusive acquisitions</p>
      </header>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white border border-stone-200 rounded-4xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500">

            {/* Main Details Panel */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest 
                    ${order.status === 'Verified' ? 'bg-green-50 text-green-700' : 
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-stone-500 text-xs md:text-sm">
                  <Calendar size={14} className="text-gold" />
                  <span className="font-light italic">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="text-left md:text-right border-t md:border-t-0 pt-6 md:pt-0 border-stone-100">
                <p className="text-[9px] uppercase text-stone-400 tracking-[0.2em] font-bold mb-1">Total Investment</p>
                <p className="text-xl md:text-2xl font-bold text-stone-900">PKR {order.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Action/Instruction Bar */}
            <div className={`px-6 py-5 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 
              ${order.status === 'Verified' ? 'bg-blue-50/50' :
                order.status === 'Delivered' ? 'bg-green-50/50' :
                order.status === 'Cancelled' ? 'bg-red-50/50' : 'bg-stone-50'}`}>

              <div className="flex items-start gap-4 flex-1 w-full">
                {/* Status-based Content */}
                <div className="shrink-0 mt-1">
                  {order.status === 'Verified' ? <CheckCircle size={18} className="text-blue-700" /> :
                   order.status === 'Delivered' ? <Package size={18} className="text-green-700" /> :
                   order.status === 'Cancelled' ? <XCircle size={18} className="text-red-700" /> :
                   <Info size={18} className="text-amber-700" />}
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-stone-800 uppercase tracking-tight">
                    {order.status === 'Verified' ? 'Payment Confirmed' : 
                     order.status === 'Delivered' ? 'Handed Over' : 
                     order.status === 'Cancelled' ? 'Voided' : 'Pending Verification'}
                  </p>
                  <p className="text-[10px] md:text-[11px] leading-relaxed text-stone-500 italic max-w-md">
                    {order.status === 'Verified' ? 'Copy the summary and send it to our WhatsApp to finalize your delivery slot.' : 
                     order.status === 'Delivered' ? 'This masterpiece has been delivered. Thank you for choosing us!' : 
                     order.status === 'Cancelled' ? 'This order was voided. Please contact support if this was an error.' : 
                     'Curators are verifying your payment. We will update you shortly.'}
                  </p>
                </div>
              </div>

              {/* Only show Copy Button when Verified */}
              {order.status === 'Verified' && (
                <button
                  onClick={() => copyOrderSummary(order)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-lg active:scale-95"
                >
                  {copiedId === order._id ? (
                    <><Check size={14} /> Copied</>
                  ) : (
                    <><Copy size={14} /> Copy Summary</>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}