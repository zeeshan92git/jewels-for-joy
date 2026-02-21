"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { ArrowLeft, UploadCloud, X } from 'lucide-react';
import Link from 'next/link';

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("Curating collection...");

    try {
      const formData = new FormData(e.target);
      const res = await fetch('/api/categories', { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Failed to create");

      toast.success("Collection added!", { id: t });
      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      toast.error(error.message, { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <Link href="/admin/categories" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-6 text-[10px] uppercase tracking-widest font-bold">
        <ArrowLeft size={14} /> Back to Collections
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl mb-10 text-stone-900">
        New <span className='text-gold italic font-light'>Category</span>
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-300 shadow-sm">
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-gold transition-colors mb-2 block">
              Collection Identity
            </label>
            <input name="name" required placeholder="e.g. Bridal Collection" className="w-full bg-transparent border-b border-stone-200 py-3 text-xl font-serif outline-none focus:border-gold transition-all" />
          </div>
          <Button type="submit" disabled={loading} className="w-full py-4 text-xs uppercase tracking-widest shadow-xl shadow-gold/10">
            {loading ? 'Finalizing...' : 'Save Category'}
          </Button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-300 shadow-sm">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-6 block text-center">
            Cover Visual
          </label>
          <div className="relative aspect-square max-w-70 mx-auto group">
            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full bg-stone-50 border-2 border-dotted border-stone-300 rounded-4xl hover:bg-stone-100/50 transition-all overflow-hidden relative">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <UploadCloud className="text-stone-300 group-hover:text-gold transition-colors" size={40} strokeWidth={1} />
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest text-center px-4">Tap to upload cover</span>
                </div>
              )}
              <input type="file" name="image" accept="image/*" required onChange={handleImageChange} className="hidden" />
            </label>
            {preview && (
               <button type="button" onClick={() => setPreview(null)} className="absolute -top-2 -right-2 bg-stone-900 text-white rounded-full p-2 shadow-lg hover:bg-red-500 transition-colors">
                 <X size={14} />
               </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}