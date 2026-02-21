"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, Loader2, Globe, Eye, EyeOff } from 'lucide-react';

export default function EditCategoryForm({ initialData }) {
  const [name, setName] = useState(initialData.name);
  const [slug, setSlug] = useState(initialData.slug || "");
  const [isActive, setIsActive] = useState(initialData.isActive);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("Updating records...");
    try {
      const res = await fetch(`/api/categories/${initialData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          slug: slug.toLowerCase().replace(/\s+/g, '-'), 
          isActive: Boolean(isActive)
        }),
      });
      if (res.ok) {
        toast.success("Collection refined!", { id: t });
        router.push('/admin/categories');
        router.refresh(); 
      } else throw new Error();
    } catch (err) {
      toast.error("An error occurred", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] border border-stone-200 shadow-sm space-y-10">
        <div className="group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Display Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-b border-stone-200 py-3 text-2xl font-serif focus:border-gold outline-none bg-transparent" required />
        </div>

        <div className="group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2 mb-2">
            <Globe size={12} /> Digital Slug
          </label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border-b border-stone-200 py-3 text-xs text-stone-500 focus:border-gold outline-none font-mono bg-transparent" />
          <p className="text-[8px] text-stone-400 mt-2 italic uppercase">Auto-generates from name if left blank</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm space-y-6">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block text-center">Visibility Status</label>
          <div className="grid grid-cols-1 gap-3">
            <button type="button" onClick={() => setIsActive(true)} className={`flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${isActive ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>
              <Eye size={14} /> <span className="text-[9px] font-bold uppercase tracking-widest">Active</span>
            </button>
            <button type="button" onClick={() => setIsActive(false)} className={`flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${!isActive ? 'bg-red-600 text-white' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>
              <EyeOff size={14} /> <span className="text-[9px] font-bold uppercase tracking-widest">Hidden</span>
            </button>
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-stone-900 text-white py-5 rounded-full flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-lg active:scale-95">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Update Collection
        </button>
      </div>
    </form>
  );
}