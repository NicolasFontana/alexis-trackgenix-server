import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    firstName: { type: Number, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
    role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
  },
);

export default mongoose.model('Employee', employeeSchema);
