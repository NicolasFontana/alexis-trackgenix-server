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
  employee:
    {
      id: { type: String, required: true },
    // name: { type: String, required: true },
    // lastName: { type: String, required: true },
    // phone: { type: String, required: true },
    // email: { type: String, required: true },
    // active: { type: Boolean, required: true },
    },
  project:
    {
      id: { type: String, required: true },
    // name: { type: String, required: true },
    // description: { type: String, required: true },
    // startDate: { type: Date, required: true },
    // endDate: { type: Date, required: true },
    // clientName: { type: String, required: true },
    // active: { type: Boolean, required: true },
    // devRate: { type: Number, required: true },
    // qaRate: { type: Number, required: true },
    // pmRate: { type: Number, required: true },
    // tlRate: { type: Number, required: true },
    // devs: { type: Number, required: true },
    // qas: { type: Number, required: true },
    // projectManager: { type: Number, required: true },
    // techLeader: { type: Number, required: true },
    // admin: {type: Employee}???? should  I add another{name: {type: ...}}    }
    },

  projectManager:
    {
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
