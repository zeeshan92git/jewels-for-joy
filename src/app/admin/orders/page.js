import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import OrderTableBody from "@/app/admin/OrderTableBody";
import { Clock, CreditCard, Inbox } from 'lucide-react';

export default async function AdminOrdersPage() {
  await dbConnect();
  const ordersData = await Order.find({}).sort({ createdAt: -1 }).lean();
  const orders = JSON.parse(JSON.stringify(ordersData));

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-[#FDFDFD] space-y-8 pb-12">
      {/* Header & Quick Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">
            Order <span className="text-gold font-light italic">Vault</span>
          </h1>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">
            Fulfillment & Premium Verification
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
          <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="bg-amber-50 p-2.5 rounded-xl"><Clock size={18} className="text-amber-600" /></div>
            <div>
              <p className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">Pending</p>
              <p className="text-lg font-serif text-stone-900 leading-none mt-1">{pendingOrders}</p>
            </div>
          </div>
          <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="bg-stone-50 p-2.5 rounded-xl"><CreditCard size={18} className="text-stone-600" /></div>
            <div>
              <p className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">Revenue</p>
              <p className="text-lg font-serif text-stone-900 leading-none mt-1">
                <span className="text-[10px] mr-1">Rs.</span>{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-stone-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        {/* Desktop Header - Hidden on Mobile */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Reference</th>
                <th className="px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Client Details</th>
                <th className="px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Investment</th>
                <th className="px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold text-center">Status</th>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <OrderTableBody initialOrders={orders} view="desktop" />
          </table>
        </div>

        {/* Mobile View - Handled inside OrderTableBody */}
        <div className="md:hidden">
            <OrderTableBody initialOrders={orders} view="mobile" />
        </div>

        {orders.length === 0 && (
          <div className="py-24 text-center">
            <Inbox className="mx-auto text-stone-200 mb-4" size={48} strokeWidth={1} />
            <p className="text-stone-400 font-serif italic">The vault is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}