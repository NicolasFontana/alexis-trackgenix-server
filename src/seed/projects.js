import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628ab4225aae617fa8002c21'),
  name: 'Patata',
  description: 'This is a descriptive String',
  startDate: '2020-04-03',
  endDate: '2022-04-03',
  clientName: 'Tito',
  active: true,
  members: [
    {
      employeeId: mongoose.Types.ObjectId('628ab4485a6f0bba3f2585d3'),
      role: 'DEV',
      rate: 24,
    },
  ],
}];
