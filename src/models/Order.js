import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
  },
  paymentMethod: { type: String, enum: ['COD', 'Advance'], required: true },
  paymentScreenshot: { type: String },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Verified',  'Delivered', 'Cancelled'] },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);