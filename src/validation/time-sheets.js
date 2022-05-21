import Joi from 'joi';

// CREATE VALIDATION by Martín Pueblas
const createTimeValidation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    projectId: Joi.array().alphanum().length(24),
    task: Joi.array().items(Joi.number().required()),
    approved: Joi.boolean().valid(true).required(),
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
    projectId: Joi.array().alphanum().length(24),
    task: Joi.array().alphanum().length(24),
    validated: Joi.boolean(),
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
