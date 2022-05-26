import Joi from 'joi';

// CREATE VALIDATION
const createTimeValidation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    projectId: Joi.string().alphanum().length(24).required(),
    Task: Joi.array().items(
      {
        taskId: Joi.string().alphanum().length(24).required(),
      },
    ),
    approved: Joi.boolean().valid(true).required(),
  });
  const validatorTimesheets = timesheetValidation.validate(req.body);
  if (validatorTimesheets.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request',
      error: validatorTimesheets.error.details[0].message,
    });
  }
  return next();
};
// UPDATE TIMESHEET VALIDATION
const updateValidation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    projectId: Joi.string().alphanum().length(24),
    Task: Joi.array().items(
      {
        taskId: Joi.string().alphanum().length(24),
      },
    ),
    approved: Joi.boolean().valid(true),
  });
  const validatorTimesheets = timesheetValidation.validate(req.body);
  if (validatorTimesheets.error) {
    return res.status(400).json({
      message: 'Please check your fields',
      error: validatorTimesheets.error,
    });
  }
  return next();
};

export default {
  createTimeValidation,
  updateValidation,
};
