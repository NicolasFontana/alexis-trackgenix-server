import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
);

export default mongoose.model('Employee', employeeSchema);
