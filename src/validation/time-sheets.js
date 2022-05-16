// import res from 'express/lib/response';
import Joi from 'joi';

// CREATE VALIDATION
const createTimeValidation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    description: Joi.string().min(20).max(150).required(),
    date: Joi.date().required(),
    task: Joi.string().alphanum().length(24),
    validated: Joi.boolean().valid(true).required(),
    employee: Joi.string().alphanum().length(24),
    project: Joi.string().alphanum().length(24),
    projectManager: Joi.string().alphanum().length(24),
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

export default {
  createTimeValidation,
};
