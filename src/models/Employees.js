import mongoose from 'mongoose';

const { Schema } = mongoose;
// POPULATE BY JAVIER Y MARTIN
const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true },
  isProjectManager: { type: Boolean, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  timeSheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSheet' }],
});

export default mongoose.model('Employee', employeeSchema);
