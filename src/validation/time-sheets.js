import Joi from 'joi';

// CREATE VALIDATION
const createTimeValidation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    projectId: Joi.string().alphanum().length(24).required()
      .messages({
        'string.alphanum':
        'Invalid project id, it must contain both letters and numbers',
        'string.length': 'Invalid project id, it must contain 24 characters',
        'any.empty': 'Project id is a required field',
      }),
    Task: Joi.array().items({
      taskId: Joi.string().alphanum().length(24).required()
        .messages({
          'string.alphanum':
          'Invalid task id, it must contain both letters and numbers',
          'string.length': 'Invalid task id, it must contain 24 characters',
          'any.empty': 'Task id is a required field',
        }),
    }),
    approved: Joi.boolean().required(),
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
    projectId: Joi.string().alphanum().length(24).messages({
      'string.alphanum':
        'Invalid project id, it must contain both letters and numbers',
      'string.length': 'Invalid project id, it must contain 24 characters',
    }),
    Task: Joi.array().items({
      taskId: Joi.string().alphanum().length(24).messages({
        'string.alphanum':
          'Invalid task id, it must contain both letters and numbers',
        'string.length': 'Invalid task id, it must contain 24 characters',
      }),
    }),
    approved: Joi.boolean(),
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
