import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', tasksSchema);
