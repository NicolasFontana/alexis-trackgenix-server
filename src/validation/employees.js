/* eslint-disable no-useless-escape */
import Joi from 'joi';

const createEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
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
      .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
      .required()
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid last name, it must contain only letters',
        'any.required': 'Last Name is a required field',
      }),
    phone: Joi.string().pattern(/^\d+$/).length(10).required()
      .messages({
        'string.pattern.base':
        'Invalid phone number, it must contain only numbers',
        'string.length': 'Invalid phone number, it must contain 10 numbers',
        'any.required': 'Phone number is a required field',
      }),
    email: Joi.string().pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).required().messages({
      'string.pattern.base': 'invalid email format',
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
    isProjectManager: Joi.boolean().required(),
    projects: Joi.array().items(
      Joi.string().alphanum().length(24).messages({
        'string.alphanum':
          'Invalid project id, it must contain both letters and numbers',
        'string.length': 'Invalid project id, it must contain 24 characters',
      }),
    ),
    timeSheets: Joi.array().items(
      Joi.string().alphanum().length(24).messages({
        'string.alphanum':
          'Invalid time sheet id, it must contain both letters and numbers',
        'string.length': 'Invalid time sheet id, it must contain 24 characters',
      }),
    ),
    address: Joi.string().allow('').min(4).messages({
      'string.min': 'Invalid address, it must contain more than 4 letters',
    }),
    picture: Joi.string().allow('').min(4).messages({
      'string.min': 'Invalid picture URL, it must contain more than 4 letters',
    }),
    dni: Joi.number().allow('', null).integer().min(20000000)
      .max(100000000)
      .messages({
        'number.integer': 'Invalid number, it must be an integer',
        'number.min': 'Invalid number, it must be a valid DNI(Between 20000000 and 100000000)',
        'number.max': 'Invalid number, it must be a valid DNI(Between 20000000 and 100000000)',
      }),
    dateBirth: Joi.date().allow(''),
  });
  const validation = Schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const updateEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern.base': 'Invalid name, it must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern.base':
          'Invalid last name, it must contain only letters',
      }),
    phone: Joi.string().pattern(/^\d+$/).length(10).messages({
      'string.pattern.base':
        'Invalid phone number, it must contain only numbers',
      'string.length': 'Invalid phone number, it must contain 10 numbers',
    }),
    email: Joi.string().pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).message('Invalid email format'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
      .allow('')
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern.base':
          'Invalid password, it must contain both letters and numbers',
      }),
    active: Joi.boolean(),
    isProjectManager: Joi.boolean(),
    projects: Joi.array().items(
      Joi.string().alphanum().length(24).messages({
        'string.alphanum':
          'Invalid project id, it must contain both letters and numbers',
        'string.length': 'Invalid project id, it must contain 24 characters',
      }),
    ),
    timeSheets: Joi.array().items(
      Joi.string().alphanum().length(24).messages({
        'string.alphanum':
          'Invalid time sheet id, it must contain both letters and numbers',
        'string.length': 'Invalid time sheet id, it must contain 24 characters',
      }),
    ),
    address: Joi.string().allow('').min(4).messages({
      'string.min': 'Invalid address, it must contain more than 4 letters',
    }),
    picture: Joi.string().allow('').min(4).messages({
      'string.min': 'Invalid picture URL, it must contain more than 4 letters',
    }),
    dni: Joi.number().allow('', null).integer().min(20000000)
      .max(100000000)
      .messages({
        'number.integer': 'Invalid number, it must be an integer',
        'number.min': 'Invalid number, it must be a valid DNI(Between 20000000 and 100000000)',
        'number.max': 'Invalid number, it must be a valid DNI(Between 20000000 and 100000000)',
      }),
    dateBirth: Joi.date().allow('', null),
  });
  const validation = Schema.validate(req.body);
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
  createEmployeeValidation,
  updateEmployeeValidation,
};
