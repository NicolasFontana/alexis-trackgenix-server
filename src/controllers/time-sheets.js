import timeSheetModel from '../models/Time-sheets';

// GET ALL
const getAllTimesheets = async (req, res) => {
  try {
    const allTimesheets = await timeSheetModel.find({});
    return res.status(200).json({
      message: 'Time-Sheets',
      data: allTimesheets,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};
// GET BY ID
const getByIdTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide an ID',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const timesheetsById = await timeSheetModel.findById(id);
    return res.status(200).json({
      message: 'Time-sheet fetched',
      data: timesheetsById,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};
// UPDATE A TIME SHEET
const updateTimeSheet = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        message: 'Please provide an ID',
        data: {},
        error: true,
      });
    }
    const updatedTimeSheet = await timeSheetModel.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
      message: 'Time-sheet updated',
      data: updatedTimeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// GET BY ROLE
// const getByRoleTimesheets = async (req, res) => {
//   try {
//     const byRoleTimesheets = await timeSheetModel.find({});
//     return res.status(200).json({
//       message: 'Time-Sheets',
//       data: byRoleTimesheets,
//       error: false,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error,
//       data: {},
//       error: true,
//     });
//   }
// };

// TO GET A TIMESHEET BY TASK
// router.get('/role/:role', async (req, res) => {
//   const timesheetRole = req.params.role.toString();
//   const response = timesheets.filter((timesheet) => timesheet.role.toString() === timesheetRole);
//   if (response.length !== 0) {
//     res.send(response);
//   } else {
//     res.send(`Role ${timesheetRole} not found`);
//   }
// });

// // TO GET A TIMESHEET BY TASK
// router.get('/task/:task', async (req, res) => {
//   const timesheetTask = req.params.task.toString();
//   const response = timesheets.find((timesheet) => timesheet.task.toString() === timesheetTask);
//   if (response) {
//     res.send(response);
//   } else {
//     res.send(`Task ${timesheetTask} not found`);
//   }
// });

// // TO CREATE A NEW TIMESHEET
// router.post('/create', (req, res) => {
//   const {
//     description, date, task, validated, employee, projectId, projectManager, role,
//   } = req.body;
//   const id = timesheets.reduce((prev, curr) => (prev <= curr.id ? curr.id + 1 : prev), 0);
//   const timesheetData = {
//     id,
//     description,
//     date,
//     task,
//     validated,
//     employee,
//     projectId,
//     projectManager,
//     role,
//   };
//   timesheets.push(timesheetData);
//   fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
//     if (err) {
//       res.status(404).send(err);
//     } else {
//       res.status(201).send('New Timesheet created.').json(timesheetData);
//     }
//   });
// });

// // GET TIME SHEETS BETWEEN DATES
// router.get('/date', async (req, res) => {
//   const { initDate, endDate } = req.body;
//   const initialDate = new Date(initDate);
//   const finalDate = new Date(endDate);
//   const beforeDate = timesheets.filter((elem) => (new Date(elem.date).getTime() <= finalDate));
//   const afterDate = timesheets.filter((elem) => (new Date(elem.date).getTime() >= initialDate));
//   const response = beforeDate.filter((elem) => afterDate.includes(elem));
//   res.status(200).json(response);
// });

// // GET TIME SHEETS ACCORDING TO VALIDATION
// router.get('/validation/:valid', async (req, res) => {
//   const { valid } = req.params;
//   const isValid = ((valid === 'true') || (valid === 'false') ? (valid === 'true')
//  : 'Invalid input');
//   if (isValid === 'Invalid input') {
//     res.status(400).json({ success: false, msg: isValid });
//   }
//   const response = timesheets.filter((elem) => elem.validated === isValid);
//   res.status(200).json(response);
// });

// // GET TIME SHEETS FROM A SPECIFIC PROJECT
// router.get('/project/id/:id', async (req, res) => {
//   const { id } = req.params;
//   const response = timesheets.filter((elem) => elem.projectId.toString() === id.toString());
//   if (response.length === 0) {
//     res.status(400).json({ success: false, msg: 'No such project' });
//   } else {
//     res.status(200).json(response);
//   }
// });

// // GET TIME SHEETS FROM A SPECIFIC EMPLOYEE
// router.get('/employee/id/:id', async (req, res) => {
//   const { id } = req.params;
//   const response = timesheets.filter((elem) => elem.employee.toString() === id.toString());
//   if (response.length === 0) {
//     res.status(400).json({ success: false, msg: 'No such employee' });
//   } else {
//     res.status(200).json(response);
//   }
// });

// // UPDATE A TIME SHEET
// router.put('/update/id/:id', async (req, res) => {
//   const { id } = req.params;
//   const {
//     description, date, task, validated, employee, projectId, projectManager, role,
//   } = req.body;
//   const copyOfTS = timesheets.find((elem) => elem.id.toString() === id.toString());
//   const restOfTimeSheets = timesheets.filter((elem) => elem.id.toString() !== id.toString());
//   const updatedTS = {
//     id: Number(id),
//     description: (description || copyOfTS.description),
//     date: (date || copyOfTS.date),
//     task: (task || copyOfTS.task),
//     validated: (validated || copyOfTS.validated),
//     employee: (employee || copyOfTS.employee),
//     projectId: (projectId || copyOfTS.projectId),
//     projectManager: (projectManager || copyOfTS.projectManager),
//     role: (role || copyOfTS.role),
//   };
//   restOfTimeSheets.push(updatedTS);
//   fs.writeFile('src/data/time-sheets.json', JSON.stringify(restOfTimeSheets), (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send('Timesheet updated');
//     }
//   });
// });

// // TO DELETE A TIMESHEET BY ID
// router.delete('/delete/:id', (req, res) => {
//   const timesheetID = req.params.id.toString();
//   const filteredTimesheet = timesheets.filter((tsheet) => tsheet.id.toString() !== timesheetID);
//   if (timesheets.length === filteredTimesheet.length) {
//     res.send('Could NOT delete timesheet because it was not found');
//   } else {
//     fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheet), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send('Timesheet deleted.');
//       }
//     });
//   }
// });

export default {
  getAllTimesheets,
  getByIdTimesheets,
  updateTimeSheet,
};
