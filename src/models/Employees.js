import mongoose from 'mongoose';

const { Schema } = mongoose;
const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  firebaseUid: { type: String, required: true },
  active: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
  isProjectManager: { type: Boolean, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  timeSheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSheet' }],
  address: { type: String },
  picture: { type: String },
  dni: { type: Number },
  dateBirth: { type: Date },
});

export default mongoose.model('Employee', employeeSchema);
