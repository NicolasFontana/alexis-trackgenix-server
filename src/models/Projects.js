import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    clientName: { type: String, required: true },
    active: { type: Boolean, required: true },
    devRate: { type: Number, required: true },
    qaRate: { type: Number, required: true },
    pmRate: { type: Number, required: true },
    tlRate: { type: Number, required: true },
    devs: [
      { type: Number, required: true },
    ],
    qas: [
      { type: Number, required: true },
    ],
    projectManager: [
      { type: Number, required: true },
    ],
    techLeader: [
      { type: Number, required: true },
    ],
    admin: [
      { type: Number, required: true },
    ],
  },
);

export default mongoose.model('Project', projectSchema);
