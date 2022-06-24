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
    members: [
      {
        employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
        role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
        rate: { type: Number, required: true },
        _id: false,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
