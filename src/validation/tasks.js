import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object({
    taskName: Joi.string().min(1).max(50).required(),
    startDate: Joi.date().required(),
    description: Joi.string().min(1).max(250).optional(),
    status: Joi.string()
      .valid('Completed', 'Paused', 'In progress', 'Cancelled')
      .required(),
  });
  const validation = taskValidation.validate(req.body);
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
  validateCreation,
};
