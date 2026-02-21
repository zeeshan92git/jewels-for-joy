"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]); 
  const [selectedFiles, setSelectedFiles] = useState([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
    e.target.value = null;
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]); // Clean up memory
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedFiles.length === 0) return toast.error("A masterpiece needs images");
    setLoading(true);
    const t = toast.loading("Curating your piece...");

    try {
      const formElement = e.target;
      const formData = new FormData();
      formData.append("name", formElement.name.value);
      formData.append("description", formElement.description.value);
      formData.append("price", formElement.price.value);
      formData.append("stock", formElement.stock.value);
      formData.append("category", formElement.category.value);
      formData.append("metalType", formElement.metalType.value);
      selectedFiles.forEach((file) => formData.append("images", file));

      const res = await fetch('/api/products', { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Failed to publish");

      toast.success("Piece Added to Vault", { id: t });
      router.push('/admin/products');
    } catch (error) {
      toast.error(error.message, { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-6 text-xs uppercase tracking-widest font-bold">
        <ArrowLeft size={14} /> Back to Inventory
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl mb-10 text-stone-900">Add New <span className="text-gold italic">Piece</span></h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-stone-300 shadow-sm">
          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-gold transition-colors">Product Name</label>
              <input name="name" required className="w-full bg-transparent border-b border-stone-200 py-3 text-xl font-serif outline-none focus:border-gold transition-colors" placeholder="E.g. Vintage Emerald Drops" />
            </div>

            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-gold transition-colors">Description</label>
              <textarea name="description" required className="w-full bg-transparent border-b border-stone-200 py-3 text-sm outline-none focus:border-gold h-32 resize-none" placeholder="Describe the craftsmanship..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-gold transition-colors">Price (PKR)</label>
                <input name="price" type="number" required className="w-full bg-transparent border-b border-stone-200 py-3 text-lg outline-none focus:border-gold font-bold" />
              </div>
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-gold transition-colors">Initial Stock</label>
                <input name="stock" type="number" required className="w-full bg-transparent border-b border-stone-200 py-3 text-lg outline-none focus:border-gold font-bold" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-300 shadow-sm space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-2 block">Collection</label>
              <select name="category" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-gold">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-2 block">Metal Finish</label>
              <select name="metalType" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-gold">
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-300 shadow-sm">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-4 block text-center">Visual Assets</label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {previews.map((url, index) => (
                <div key={index} className="relative aspect-4/5 rounded-2xl overflow-hidden border border-stone-100 group shadow-inner">
                  <img src={url} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-stone-900/80 text-white rounded-full p-1.5 backdrop-blur-sm hover:bg-red-500 transition-colors">
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ))}
              <label className="cursor-pointer flex flex-col items-center justify-center aspect-4/5 border-2 border-dotted border-stone-400 rounded-2xl hover:bg-stone-50 transition-all group">
                <ImagePlus className="text-stone-300 group-hover:text-gold transition-colors" size={32} strokeWidth={1} />
                <span className="text-[9px] text-stone-400 uppercase font-bold mt-2">Add Photo</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <Button disabled={loading} type="submit" className="w-full py-5 rounded-full shadow-xl shadow-gold/10">
            {loading ? 'Curating...' : 'Publish Piece'}
          </Button>
        </div>
      </form>
    </div>
  );
}