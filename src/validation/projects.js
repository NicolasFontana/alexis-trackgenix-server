import Joi from 'joi';

// validations by pinche (:
const validateCreate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(50)
      .pattern(/^[A-Z][a-zA-Z\s]*$/)
      .message('Project name must contain only letters and start with a cap letter')
      .required(),
    description: Joi.string().min(4).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).message('Invalid end date, it must be after the start date').required(),
    clientName: Joi.string().min(3).max(50)
      .pattern(/^([A-Za-z])/)
      .message('Client name must contain only letters')
      .required(),
    active: Joi.boolean().required(),
    members: Joi.array().items({
      employeeId: Joi.string().alphanum().length(24).required(),
      role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
      rate: Joi.number().min(0).message('Rate number must be positive').required(),
    }),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const projectValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50)
      .pattern(/^[A-Z][a-zA-Z\s]*$/)
      .message('Project name must contain only letters and start with a cap letter'),
    description: Joi.string().min(4),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')).message('Invalid end date, it must be after the start date'),
    clientName: Joi.string().min(3).max(50)
      .pattern(/^([A-Za-z])/)
      .message('Client name must contain only letters'),
    active: Joi.boolean(),
    members: Joi.array().items({
      employeeId: Joi.string().alphanum().length(24),
      role: Joi.string().valid('QA', 'DEV', 'TL', 'PM'),
      rate: Joi.number().min(0).message('Rate number must be positive'),
    }),
  });
  const validation = projectValidationSchema.validate(req.body);
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
  validateCreate,
  validateUpdate,
};
