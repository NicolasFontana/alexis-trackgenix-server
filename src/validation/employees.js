/* eslint-disable no-useless-escape */
import Joi from 'joi';

const createEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid name, it must contain only letters',
      })
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid last name, it must contain only letters',
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\d+$/)
      .length(10)
      .messages({
        'string.pattern': 'Invalid phone number, it must contain only numbers',
        'string.lenght': 'Invalid phone number, it must contain 10 numbers',
      })
      .required(),
    email: Joi.string().email().message('Invalid email format').required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern':
          'Invalid password, it must contain both letters and numbers',
      })
      .required(),
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
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid name, it must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid last name, it must contain only letters',
      }),
    phone: Joi.string().pattern(/^\d+$/).length(10).messages({
      'string.pattern': 'Invalid phone number, it must contain only numbers',
      'string.lenght': 'Invalid phone number, it must contain 10 numbers',
    }),
    email: Joi.string().email().message('Invalid email format'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern':
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
