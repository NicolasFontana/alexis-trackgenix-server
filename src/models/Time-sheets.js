import mongoose from 'mongoose';

const { Schema } = mongoose;
const timeSheetSchema = new Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
    taskId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task' }],
    approved: { type: Boolean, required: true },
  },
);

export default mongoose.model('TimeSheet', timeSheetSchema);
