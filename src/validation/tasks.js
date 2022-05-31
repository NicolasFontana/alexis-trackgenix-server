import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object(
    {
      taskName: Joi.string().min(3).required(),
      startDate: Joi.date().required(),
      workedHours: Joi.number().integer().min(0).required(),
      description: Joi.string().min(6).max(250).required(),
      status: Joi.string().min(2).valid(
        'To do',
        'In progress',
        'Review',
        'Blocked',
        'Done',
        'Cancelled',
      ).required(),
    },
  );

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      data: undefined,
      error: true,
    });
  }

  return next();
};

const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    taskName: Joi.string().min(3),
    startDate: Joi.date(),
    workedHours: Joi.number(),
    description: Joi.string().min(6).max(250),
    status: Joi.string().min(2).valid(
      'To do',
      'In progress',
      'Review',
      'Blocked',
      'Done',
      'Cancelled',
    ),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
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
