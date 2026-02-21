"use client";
import { Edit, Trash, Loader2, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductActions({ productId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const t = toast.loading("Removing from vault...");
    
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Masterpiece removed", { id: t });
        router.refresh();
      } else {
        toast.error("Failed to delete", { id: t });
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error("Network error", { id: t });
      setShowConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end items-center gap-2 min-h-[40px]">
      {!showConfirm ? (
        <>
          {/* Edit Button */}
          <button 
            onClick={() => router.push(`/admin/products/edit/${productId}`)}
            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all active:scale-90"
            title="Edit Masterpiece"
          >
            <Edit size={18} strokeWidth={1.5} />
          </button>

          {/* Initial Delete Button */}
          <button 
            onClick={() => setShowConfirm(true)}
            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-90"
            title="Remove from Vault"
          >
            <Trash size={18} strokeWidth={1.5} />
          </button>
        </>
      ) : (
        /* Boutique Confirmation Pod */
        <div className="flex items-center gap-1 bg-white border border-stone-200 shadow-xl p-1 rounded-full animate-in slide-in-from-right-2 duration-300">
          <span className="text-[8px] uppercase font-bold text-stone-400 px-2 tracking-widest">
            Confirm?
          </span>
          
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          </button>

          <button 
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className="bg-stone-100 text-stone-500 p-2 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}