/* eslint-disable no-useless-escape */
import Joi from 'joi';

const createEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    active: Joi.boolean().required(),
    projects: Joi.array().items({}).required(),
    timeSheets: Joi.array().items({}).required(),
  });
  const validation = Schema.validate(req.body);
  if (validation.err) {
    return res.status(400).json({
      message: 'There was an error during the validation process',
      err: validation.err.details[0],
    });
  }
  return next();
};

const updateEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    phone: Joi.number().min(10),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    active: Joi.boolean(),
    projects: Joi.array().items({}),
    timeSheets: Joi.array().items({}),
  });
  const validation = Schema.validate(req.body);
  if (validation.err) {
    return res.status(400).json({
      message: 'There was an error during the validation process',
      err: validation.err.details[0],
    });
  }
  return next();
};

export default {
  createEmployeeValidation,
  updateEmployeeValidation,
};
