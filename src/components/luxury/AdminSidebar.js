import Link from 'next/link';
import { LayoutDashboard, Package, ListTree, ShoppingCart } from 'lucide-react';

export default function AdminSidebar() {
  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: ListTree },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR: Visible on md+ */}
      <aside className="hidden md:flex w-64 border-r border-stone-200 h-screen sticky top-0 bg-white p-6 flex-col">
        <div className="font-serif text-2xl mb-10 tracking-tighter">
          Jewels <span className='text-gold'>for</span> Joy 
          <span className="block text-[10px] uppercase font-sans tracking-widest text-stone-500">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-lg transition-all">
              <link.icon size={18} strokeWidth={1.5} />
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MOBILE BOTTOM BAR: Visible on small screens only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50 flex justify-around items-center p-2 shadow-lg">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex flex-col items-center gap-1 p-2 text-stone-600 active:text-gold">
            <link.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-tighter">{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}