import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import Category from '@/models/Category';
import { TrendingUp, Package, ListTree, ShoppingBag,ArrowLeft } from 'lucide-react';

export default async function AdminDashboard() {
  await dbConnect();
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    const [productCount, categoryCount, orderCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
    ]);

    const stats = [
      { label: 'Total Products', value: productCount, icon: Package },
      { label: 'Collections', value: categoryCount, icon: ListTree },
      { label: 'Recent Orders', value: orderCount, icon: ShoppingBag },
      { label: 'Total Revenue', value: `Rs. ${totalRevenue.toLocaleString()}`, icon: TrendingUp },
    ];

    return (
      <div className="animate-in fade-in duration-500">
        <header className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900">
            Executive <span className='text-gold italic font-light'>Overview</span>
          </h1>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">
            Boutique Performance Metrics
          </p>
        </header>

        {/* Grid: 1 col on tiny mobile, 2 cols on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-stone-50 rounded-xl group-hover:bg-gold/10 transition-colors">
                  <stat.icon size={20} className="text-stone-400 group-hover:text-gold" />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-serif text-stone-900 tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        
        {/* Quick Action Suggestion for Admin */}
        <div className="mt-12 p-8 rounded-[2.5rem] bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-serif text-xl mb-1 text-gold italic">Curate your collection</h3>
            <p className="text-stone-400 text-xs tracking-wide max-w-md">
              Orders are flowing in. Is your inventory up to date for the next client?
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center md:items-end gap-2">
            <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">Next Phase</p>
            <div className="flex items-center gap-2 text-white/90">
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest border-b border-gold pb-1">
                Use the Sidebar to add New Masterpieces
              </span>
              <span className="md:hidden text-[10px] font-bold uppercase tracking-widest border-b border-gold pb-1">
                Use the Bottombar to add New Masterpieces
              </span>
              <ArrowLeft size={14} className="text-gold animate-pulse rotate-270 md:rotate-0" />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return (
      <div className="p-12 text-center border border-red-100 bg-red-50 rounded-3xl text-red-600">
        <p className="font-bold">System Connection Interrupted</p>
        <p className="text-xs mt-1 opacity-70 italic">Unable to synchronize with the vault.</p>
      </div>
    );
  }
}