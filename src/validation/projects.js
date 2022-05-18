import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    clientName: Joi.string().required(),
    active: Joi.boolean().required(),
    devRate: Joi.number().required(),
    qaRate: Joi.number().required(),
    pmRate: Joi.number().required(),
    tlRate: Joi.number().required(),
    devs: Joi.array().items(
      Joi.number().required(),
    ),
    qas: Joi.array().items(
      Joi.number().required(),
    ),
    projectManager: Joi.array().items(
      Joi.number().required(),
    ),
    techLeader: Joi.array().items(
      Joi.number().required(),
    ),
    admin: Joi.array().items(
      Joi.number().required(),
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
    name: Joi.string().min(1).max(50),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    clientName: Joi.string(),
    active: Joi.boolean(),
    devRate: Joi.number(),
    qaRate: Joi.number(),
    pmRate: Joi.number(),
    tlRate: Joi.number(),
    devs: Joi.array().items(
      Joi.number(),
    ),
    qas: Joi.array().items(
      Joi.number(),
    ),
    projectManager: Joi.array().items(
      Joi.number(),
    ),
    techLeader: Joi.array().items(
      Joi.number(),
    ),
    admin: Joi.array().items(
      Joi.number(),
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
