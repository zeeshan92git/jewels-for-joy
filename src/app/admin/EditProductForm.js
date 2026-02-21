"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, Loader2, Sparkles, Package, BadgeCheck } from 'lucide-react';

export default function EditProductForm({ initialProduct, categories }) {
  const [formData, setFormData] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("Updating the masterpiece...");

    try {
      const res = await fetch(`/api/products/${initialProduct._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Collection updated!", { id: t });
        router.push('/admin/products');
        router.refresh();
      } else {
        toast.error("Failed to sync changes.", { id: t });
      }
    } catch (error) {
      toast.error("A vault error occurred.", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Primary Details */}
      <div className="lg:col-span-2 space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-300 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gold">
          <Sparkles size={18} />
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Essential Details</h2>
        </div>

        <div className="space-y-8">
          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 group-focus-within:text-gold transition-colors">Product Name</label>
            <input 
              className="text-2xl font-serif border-b border-stone-100 py-2 focus:border-gold outline-none transition-colors bg-transparent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 group-focus-within:text-gold transition-colors">Description</label>
            <textarea 
              rows={5}
              className="text-sm leading-relaxed border border-stone-200 p-4 rounded-2xl focus:border-gold outline-none transition-colors bg-stone-50/30 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Investment (PKR)</label>
              <input 
                type="number"
                className="text-lg font-bold border-b border-stone-200 py-2 focus:border-gold outline-none transition-colors bg-transparent"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>

            <div className="group flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Available Stock</label>
              <input 
                type="number"
                className="text-lg font-bold border-b border-stone-200 py-2 focus:border-gold outline-none transition-colors bg-transparent"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side Management Panel */}
      <div className="space-y-6">
        {/* Inventory Status & Categorization */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-300 shadow-sm space-y-6">
          <div className="flex flex-col gap-4">
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Collection</label>
              <select 
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-gold"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Metal Type</label>
              <select 
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-gold"
                value={formData.metalType}
                onChange={(e) => setFormData({...formData, metalType: e.target.value})}
              >
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Visual Reference (Static in Edit) */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-stone-300 shadow-sm">
          <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-4 block text-center">Current Visuals</label>
          <div className="grid grid-cols-2 gap-2">
            {formData.images?.map((img, idx) => (
              <div key={idx} className="aspect-4/5 rounded-xl overflow-hidden border border-stone-200 shadow-inner relative group">
                <img src={img} alt="" className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <BadgeCheck className="text-white" size={20} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[8px] text-stone-400 mt-4 text-center italic font-medium leading-relaxed">
            Note: To modify images, please delete and re-create the masterpiece for security.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-5 rounded-full flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-xl disabled:opacity-50 active:scale-95"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
          
          <button 
            type="button"
            onClick={() => router.back()}
            className="w-full bg-white border border-stone-200 text-stone-400 py-4 rounded-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
          >
            Discard Edits
          </button>
        </div>
      </div>
    </form>
  );
}