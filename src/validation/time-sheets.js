import Joi from 'joi';

// CREATE VALIDATION by Martín Pueblas
const createTimeValidation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    description: Joi.string().min(20).max(150).required(),
    date: Joi.date().required(),
    taskId: Joi.string().alphanum().length(24),
    validated: Joi.boolean().valid(true).required(),
    employeeId: Joi.string().alphanum().length(24),
    projectId: Joi.string().alphanum().length(24),
    projectManagerId: Joi.string().alphanum().length(24),
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
  });

  const validatorTimesheets = timesheetValidation.validate(req.body);

  if (validatorTimesheets.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validatorTimesheets.error.details[0].message,
    });
  }
  return next();
};
// UPDATE TIMESHEET VALIDATION by Ana
const updateValidation = (req, res, next) => {
  const timeSheetSchema = Joi.object({
    description: Joi.string(),
    date: Joi.date().max('now'),
    taskId: Joi.string().alphanum().length(24),
    validated: Joi.boolean(),
    employeeId: Joi.string().alphanum().length(24),
    projectId: Joi.string().alphanum().length(24),
    projectManagerId: Joi.string().alphanum().length(24),
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM'),
  });
  const validation = timeSheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Please check your fields',
      error: validation.error,
    });
  }
  return next();
};

export default {
  createTimeValidation,
  updateValidation,
};
