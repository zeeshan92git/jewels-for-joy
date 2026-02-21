import Link from 'next/link';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Button from '@/components/ui/Button';
import { Plus, Package, Layers } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProductActions from './ProductActions';

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  await dbConnect();
  const products = await Product.find({}).populate('category').sort({ createdAt: -1 });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900">
            Product <span className='text-gold italic font-light'>Inventory</span>
          </h1>
          <p className="text-stone-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Curate your jewelry pieces</p>
        </div>
        <Link href="/admin/products/new" className="w-full sm:w-auto">
          <Button variant="gold" className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full shadow-lg">
            <Plus size={16} /> <span className="text-[10px] uppercase tracking-widest">Add New Masterpiece</span>
          </Button>
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-400 uppercase text-[9px] tracking-[0.2em]">
            <tr>
              <th className="px-8 py-5 font-bold">Product Details</th>
              <th className="px-6 py-5 font-bold text-center">Collection</th>
              <th className="px-6 py-5 font-bold text-center">Price</th>
              <th className="px-6 py-5 font-bold text-center">Stock</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-stone-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img src={item.images[0]} className="w-12 h-14 object-cover rounded-lg bg-stone-100 border border-stone-200" alt={item.name} />
                    <div>
                      <p className="font-serif text-stone-900 text-base">{item.name}</p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-tighter">{item.metalType || 'Gold Plated'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                   <span className="text-[10px] bg-stone-100 px-3 py-1 rounded-full uppercase font-bold text-stone-600">
                    {item.category?.name || 'Uncategorized'}
                   </span>
                </td>
                <td className="px-6 py-5 text-center font-medium text-stone-900">Rs. {item.price.toLocaleString()}</td>
                <td className="px-6 py-5 text-center">
                  <span className={`text-xs font-bold ${item.stock < 5 ? 'text-red-500' : 'text-stone-600'}`}>
                    {item.stock} <span className="font-normal text-[10px] uppercase tracking-tighter">Units</span>
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <ProductActions productId={item._id.toString()}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex gap-4">
            <img src={item.images[0]} className="w-20 h-24 object-cover rounded-2xl border border-stone-100" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg text-stone-900 leading-tight">{item.name}</h3>
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">{item.category?.name}</p>
                <p className="font-bold text-stone-900 mt-2">Rs. {item.price.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] text-stone-400 uppercase font-bold">Stock: {item.stock}</span>
                <ProductActions productId={item._id.toString()}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-stone-300">
           <Package className="mx-auto text-stone-200 mb-4" size={48} strokeWidth={1} />
           <p className="text-stone-400 italic font-serif">The vault is currently empty.</p>
        </div>
      )}
    </div>
  );
}