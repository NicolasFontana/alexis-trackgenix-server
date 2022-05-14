import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    active: Joi.boolean(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      error: validation.error.details[0],
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).alphanum(),
    active: Joi.boolean(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      error: validation.error.details[0],
    });
  }
  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
