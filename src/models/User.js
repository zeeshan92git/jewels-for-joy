import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Don't return password by default
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // Ensure these are explicitly defined
  resetPasswordToken: { type: String, select: true },
  resetPasswordExpires: { type: Date, select: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);