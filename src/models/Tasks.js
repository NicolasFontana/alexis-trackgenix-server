import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['Completed', 'Paused', 'In progress', 'Cancelled'],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', tasksSchema);
