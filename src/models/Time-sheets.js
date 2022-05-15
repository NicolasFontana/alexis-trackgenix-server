import mongoose from 'mongoose';

const { Schema } = mongoose;
const timeSheetSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  task: {
    id: { type: String, required: true },
    // description: { type: String, required: true },
  },
  validated: { type: Boolean, required: true },
  employee: {
    id: { type: String, required: true },
    // name: { type: String, required: true },
    // lastName: { type: String, required: true },
    // phone: { type: String, required: true },
    // email: { type: String, required: true },
    // active: { type: Boolean, required: true },
  },
  project: {
    id: { type: String, required: true },
  },
  projectManager: {
    id: { type: String, required: true },
    // name: { type: String, required: true },
    // lastName: { type: String, required: true },
    // phone: { type: String, required: true },
    // email: { type: String, required: true },
    // active: { type: Boolean, required: true }
  },
  role: { type: String, required: true },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
