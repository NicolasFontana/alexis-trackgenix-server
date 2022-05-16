import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const projectValidation = Joi.object({
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
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validation.error.details[0].message,
    });
  }
  return next();
};
export default {
  validateUpdate,
};
