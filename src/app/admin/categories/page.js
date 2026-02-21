import Link from 'next/link';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Button from '@/components/ui/Button';
import { Plus, Edit, PackageSearch } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CategoryDeleteBtn from "@/app/admin/categories/CategoryActions";

export default async function AdminCategoriesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");
  
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 }).lean();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900">
            Category <span className='text-gold italic font-light'>Collections</span>
          </h1>
          <p className="text-stone-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Organize your masterpieces</p>
        </div>
        <Link href="/admin/categories/new" className="w-full sm:w-auto">
          <Button variant="gold" className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full shadow-lg">
            <Plus size={16} /> <span className="text-[10px] uppercase tracking-widest">Create New Collection</span>
          </Button>
        </Link>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white border border-stone-200 rounded-4xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-400 uppercase text-[9px] tracking-[0.2em]">
            <tr>
              <th className="px-8 py-5 font-bold">Visual Preview</th>
              <th className="px-6 py-5 font-bold">Collection Name</th>
              <th className="px-6 py-5 font-bold text-center">Visibility</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {categories.map((cat) => (
              <tr key={cat._id.toString()} className="hover:bg-stone-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="h-16 w-16 bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
                    <img src={cat.image || 'https://via.placeholder.com/100'} alt={cat.name} className="h-full w-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="font-serif text-stone-900 text-lg">{cat.name}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-4 py-1.5 text-[9px] uppercase tracking-widest font-bold rounded-full border ${
                    cat.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-stone-100 text-stone-400 border-stone-200'
                  }`}>
                    {cat.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Link href={`/admin/categories/edit/${cat._id}`} className="p-2 text-stone-400 hover:text-gold transition-colors">
                      <Edit size={18} strokeWidth={1.5} />
                    </Link>
                    <CategoryDeleteBtn catId={cat._id.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {categories.map((cat) => (
          <div key={cat._id.toString()} className="bg-white p-5 rounded-3xl border border-stone-300 shadow-sm flex items-center gap-5">
            {/* image */}
            <div className="h-20 w-20 shrink-0 bg-stone-100 rounded-2xl overflow-hidden border border-stone-100">
              <img src={cat.image || 'https://via.placeholder.com/100'} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-stone-900 leading-tight">{cat.name}</h3>
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md border ${
                  cat.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-stone-100 text-stone-400 border-stone-200'
                }`}>
                  {cat.isActive ? 'Active' : 'Hidden'}
                </span>
                <div className="ml-auto flex flex-col  items-center gap-2">
                  <Link href={`/admin/categories/edit/${cat._id}`} className="p-2 bg-stone-50 rounded-full text-stone-400 active:text-gold transition-colors">
                    <Edit size={16} />
                  </Link>
                  <div className="p-2 bg-red-50 rounded-full text-red-400">
                    <CategoryDeleteBtn catId={cat._id.toString()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 bg-white rounded-4xl border border-dashed border-stone-300">
          <PackageSearch className="mx-auto text-stone-200 mb-4" size={48} strokeWidth={1} />
          <p className="text-stone-400 italic font-serif">No collections found.</p>
        </div>
      )}
    </div>
  );
}