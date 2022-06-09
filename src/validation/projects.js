import Joi from 'joi';

// validations by pinche (:
const validateCreate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min':
          'Invalid project name, it must contain more than 3 letters',
        'string.max':
          'Invalid project name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid project name, it must contain only letters',
      })
      .required(),
    description: Joi.string()
      .min(4)
      .message('Invalid description, it must contain more than 4 letters')
      .required(),
    startDate: Joi.date().required(),
    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .message('Invalid end date, it must be after the start date')
      .required(),
    clientName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min':
          'Invalid client name, it must contain more than 3 letters',
        'string.max':
          'Invalid client name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid client name, it must contain only letters',
      })
      .required(),
    active: Joi.boolean().required(),
    members: Joi.array().items({
      employeeId: Joi.string()
        .alphanum()
        .length(24)
        .messages({
          'string.alphanum':
            'Invalid employee id, it must contain both letters and numbers',
          'string.length': 'Invalid employee id, it must contain 24 characters',
        })
        .required(),
      role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
      rate: Joi.number()
        .min(0)
        .max(999999)
        .messages({
          'number.min': 'Invalid rate, it must be positive',
          'number.max': 'Invalid rate, it must be between 0 and 999999',
        })
        .required(),
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
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min':
          'Invalid project name, it must contain more than 3 letters',
        'string.max':
          'Invalid project name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid project name, it must contain only letters',
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
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min':
          'Invalid client name, it must contain more than 3 letters',
        'string.max':
          'Invalid client name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid client name, it must contain only letters',
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
