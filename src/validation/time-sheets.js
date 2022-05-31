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
  const validation = timesheetValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
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
  const validation = timesheetValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  createTimeValidation,
  updateValidation,
};
