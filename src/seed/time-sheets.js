import mongoose from 'mongoose';

export default [{
  projectId: {
    _id: mongoose.Types.ObjectId('6289c467fc13ae72d60000c9'),
  },
  Task: {
    _id: mongoose.Types.ObjectId('6289c467fc13ae72d60000ca'),
    taskDate: '6/21/2021',
    workedHours: 33,
    description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
  },
  approved: true,
}];
