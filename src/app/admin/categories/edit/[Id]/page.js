import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import EditCategoryForm from '@/app/admin/EditCategoryForm';
import { notFound } from 'next/navigation';

export default async function EditCategoryPage({ params }) {
  await dbConnect();
  const { Id } = await params;

  // Fetch the specific category
  const category = await Category.findById(Id).lean();

  if (!category) {
    notFound(); // Triggers the 404 page if ID is invalid
  }

  // Convert MongoDB object to a plain JS object for the Client Component
  const serializedCategory = JSON.parse(JSON.stringify(category));

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl text-stone-900">
          Edit <span className="text-gold italic font-light">Collection</span>
        </h1>
        <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-2">
          Update category name and identity
        </p>
      </div>

      <EditCategoryForm initialData={serializedCategory} />
    </div>
  );
}