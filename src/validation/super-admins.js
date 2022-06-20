import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]*$/u)
      .required()
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern.base': 'Invalid name, it must contain only letters',
        'any.required': 'First Name is a required field',
      }),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]*$/u)
      .required()
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid last name, it must contain only letters',
        'any.required': 'Last Name is a required field',
      }),
    email: Joi.string().email().required().messages({
      'string.email': 'invalid email format',
      'any.required': 'Email is a required field',
    }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
      .required()
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern.base':
          'Invalid password, it must contain both letters and numbers',
        'any.required': 'Password is a required field',
      }),
    active: Joi.boolean().required(),
  });
  const validation = schema.validate(req.body);
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
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]*$/u)
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern.base': 'Invalid name, it must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]*$/u)
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid last name, it must contain only letters',
      }),
    email: Joi.string().email().message('Invalid email format'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern.base':
          'Invalid password, it must contain both letters and numbers',
      }),
    active: Joi.boolean(),
  });
  const validation = schema.validate(req.body);
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
  validateUpdate,
};
