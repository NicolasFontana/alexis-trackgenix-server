import mongoose from 'mongoose';

const { Schema } = mongoose;
const timeSheetSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  taskId: { type: String, required: true },
  validated: { type: Boolean, required: true },
  employeeId: { type: String, required: true },
  projectId: { type: String, required: true },
  projectManagerId: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
