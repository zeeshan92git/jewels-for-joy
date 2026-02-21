import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from "@/models/Product";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Smartphone, 
  CreditCard, 
  Package, 
  ExternalLink,
  Info
} from 'lucide-react';

export default async function OrderDetailPage({ params }) {
  await dbConnect();
  const { Id } = await params;

  const order = await Order.findById(Id).populate('items.product').lean();
  if (!order) notFound();

  // Helper for status styling
  const statusStyles = {
    Verified: 'bg-blue-50 text-blue-700 border-blue-100',
    Delivered: 'bg-green-50 text-green-700 border-green-100',
    Pending: 'bg-amber-50 text-amber-700 border-amber-100',
    Cancelled: 'bg-red-50 text-red-700 border-red-100'
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/admin/orders" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-all w-fit group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Order Vault
          </Link>
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <h1 className="font-serif text-2xl md:text-3xl text-stone-900">
              Order <span className="text-stone-400">#{order._id.toString().slice(-6).toUpperCase()}</span>
            </h1>
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[order.status]}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Main Content (Items & Proof) - 8 Cols */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Items Summary Card */}
            <div className="bg-white border border-stone-200 rounded-4xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-xl text-stone-900 mb-6 flex items-center gap-2">
                <Package size={20} className="text-gold" strokeWidth={1.5} /> 
                Manifest
              </h2>
              
              <div className="divide-y divide-stone-50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* <div className="h-16 w-16 md:h-20 md:w-20 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 shrink-0">
                        <img 
                          src={item.product?.images?.[0] || '/placeholder.png'} 
                          className="h-full w-full object-cover" 
                          alt="product"
                        />
                      </div> */}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-800 truncate">{item.name || 'Deleted Product'}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-stone-900 whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <div className="flex justify-between items-center bg-stone-50 p-6 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Total Investment</span>
                  <span className="text-xl md:text-2xl font-serif text-stone-900">PKR {order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Transaction Proof Card */}
            {order.paymentScreenshot && (
              <div className="bg-white border border-stone-200 rounded-4xl p-6 md:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-xl text-stone-900">Transaction Proof</h2>
                  <a 
                    href={order.paymentScreenshot} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-stone-900 transition-colors"
                  >
                    View Original <ExternalLink size={14} />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 group relative">
                   <img 
                    src={order.paymentScreenshot} 
                    className="w-full h-auto object-contain max-h-125 transition-transform duration-500 group-hover:scale-[1.02]" 
                    alt="Payment Proof" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Customer & Meta) - 4 Cols */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            
            {/* Customer Information Card */}
            <div className="bg-stone-900 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                Customer Profile
              </h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-xl h-fit border border-white/10"><Smartphone size={18} className="text-gold" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-[9px] text-stone-500 uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-sm font-medium tracking-tight">{order.shippingAddress?.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-xl h-fit border border-white/10"><MapPin size={18} className="text-gold" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-[9px] text-stone-500 uppercase tracking-widest mb-1">Courier destination</p>
                    <p className="text-sm font-medium leading-relaxed">
                      <span className="text-gold">{order.shippingAddress?.fullName}</span><br />
                      {order.shippingAddress?.address}<br />
                      {order.shippingAddress?.city}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-xl h-fit border border-white/10"><CreditCard size={18} className="text-gold" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-[9px] text-stone-500 uppercase tracking-widest mb-1">Settlement Method</p>
                    <p className="text-sm font-medium">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-white border border-stone-200 rounded-4xl p-8 shadow-sm">
              <h3 className="text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Info size={14} className="text-stone-400" /> Administrative Info
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center py-2 border-b border-stone-50">
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-tighter">System Reference</span>
                  <span className="text-[10px] font-mono font-bold text-stone-900 truncate ml-4 max-w-30">
                    {order._id.toString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-tighter">Log Date</span>
                  <span className="text-[10px] font-bold text-stone-900">
                    {new Date(order.createdAt).toLocaleString('en-GB', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}