import Joi from 'joi';

// validations by pinche (:
const validateCreate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    clientName: Joi.string().required(),
    active: Joi.boolean().required(),
    members: Joi.array().items(
      {
        employeeId: Joi.string().alphanum().length(24).required(),
        role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
        rate: Joi.number().required(),
      },
    ),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const projectValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    clientName: Joi.string(),
    active: Joi.boolean(),
    members: Joi.array().items(
      {
        employeeId: Joi.string().alphanum().length(24),
        role: Joi.string().valid('QA', 'DEV', 'TL', 'PM'),
        rate: Joi.number(),
      },
    ),
  });
  const validation = projectValidationSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validation.error.details[0].message,
    });
  }
  return next();
};
export default {
  validateCreate,
  validateUpdate,
};
