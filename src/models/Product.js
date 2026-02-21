import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  images: [{ type: String }], // Array for multiple views (front, side, on-model)
  stock: { type: Number, default: 0 },
  metalType: { 
    type: String, 
    enum: ['Gold', 'Silver', 'Platinum', 'Rose Gold'],
    required: true 
  },
  isFeatured: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);