"use client";
import { Trash2, Loader2, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CategoryDeleteBtn({ catId }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${catId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Collection removed from vault");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
        setShowConfirm(false);
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      {!showConfirm ? (
        <button 
          onClick={() => setShowConfirm(true)}
          disabled={loading}
          className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 active:scale-90"
          title="Delete Collection"
        >
          <Trash2 size={18} strokeWidth={1.5} />
        </button>
      ) : (
        /* Boutique Inline Confirmation - Better than a generic browser alert */
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white border border-red-100 shadow-xl p-2 rounded-full animate-in zoom-in duration-200 z-50 min-w-35">
          <div className="flex flex-col  px-2">
            <span className="text-[8px] uppercase font-bold text-stone-400 tracking-widest">CONFIRM?</span>
          </div>
          <button 
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          </button>
          <button 
            onClick={() => setShowConfirm(false)}
            className="bg-stone-100 text-stone-500 p-2 rounded-xl hover:bg-stone-200 transition-colors text-[10px] font-bold"
          >
            <X size={14}/>
          </button>
        </div>
      )}
    </div>
  );
}