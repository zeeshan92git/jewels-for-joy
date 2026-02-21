import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  image: { type: String, required: true }, // Cloudinary URL
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);