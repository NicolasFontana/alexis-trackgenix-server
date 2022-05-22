import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId },
    taskDate: { type: Date, required: true },
    workedHours: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Task', tasksSchema);
