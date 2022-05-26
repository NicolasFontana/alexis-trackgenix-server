import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
  Task: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    //   taskDate: { type: Date, required: true, ref: 'Task' },
    //   workedHours: { type: Number, required: true, ref: 'Task' },
    //   description: { type: String, required: true, ref: 'Task' },
    },
    { timestamps: true },
  ],
  approved: { type: Boolean, required: true },
});
export default mongoose.model('TimeSheet', timeSheetSchema);
