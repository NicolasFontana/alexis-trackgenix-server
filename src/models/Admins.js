import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    firebaseUid: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Admin', adminSchema);
