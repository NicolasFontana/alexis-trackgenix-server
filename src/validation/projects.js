import Joi from 'joi';

// validations by pinche (:
const validateCreate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
      .required()
      .messages({
        'string.min':
          'Invalid project name, it must contain more than 3 letters',
        'string.max':
          'Invalid project name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid project name, it must contain only letters and start with a capital letter',
        'any.required': 'Name is a required field',
      }),
    description: Joi.string().min(4).required().messages({
      'string.min': 'Invalid description, it must contain more than 4 letters',
      'any.required': 'Description is a required field',
    }),
    startDate: Joi.date()
      .required()
      .messages({ 'any.required': 'Start date is a rquired field' }),
    endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
      'date.greater': 'Invalid end date, it must be after the start date',
      'any.required': 'End date is a required field',
    }),
    clientName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
      .required()
      .messages({
        'string.min':
          'Invalid client name, it must contain more than 3 letters',
        'string.max':
          'Invalid client name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid client name, it must contain only letters and start with a capital letter',
        'any.required': 'Client name is a required field',
      }),
    active: Joi.boolean().required(),
    members: Joi.array().items({
      employeeId: Joi.string().alphanum().length(24).required()
        .messages({
          'string.alphanum':
          'Invalid employee id, it must contain both letters and numbers',
          'string.length': 'Invalid employee id, it must contain 24 characters',
          'any.required': 'Employee id is a required field',
        }),
      role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
      rate: Joi.number().min(0).max(999999).required()
        .messages({
          'number.min': 'Invalid rate, it must be positive',
          'number.max': 'Invalid rate, it must be between 0 and 999999',
          'any.required': 'Rate is a required field',
        }),
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
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
      .messages({
        'string.min':
          'Invalid project name, it must contain more than 3 letters',
        'string.max':
          'Invalid project name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid project name, it must contain only letters and start with a capital letter',
      }),
    description: Joi.string()
      .min(4)
      .message('Invalid description, it must contain more than 4 letters'),
    startDate: Joi.date(),
    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .message('Invalid end date, it must be after the start date'),
    clientName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
      .messages({
        'string.min':
          'Invalid client name, it must contain more than 3 letters',
        'string.max':
          'Invalid client name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid client name, it must contain only letters and start with a capital letter',
      }),
    active: Joi.boolean(),
    members: Joi.array().items({
      employeeId: Joi.string().alphanum().length(24).messages({
        'string.alphanum':
          'Invalid employee id, it must contain both letters and numbers',
        'string.length': 'Invalid employee id, it must contain 24 characters',
      }),
      role: Joi.string().valid('QA', 'DEV', 'TL', 'PM'),
      rate: Joi.number().min(0).max(999999).messages({
        'number.min': 'Invalid rate, it must be positive',
        'number.max': 'Invalid rate, it must be between 0 and 999999',
      }),
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
