import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object({
    taskName: Joi.string().min(3).max(50).required()
      .messages({
        'string.min': 'Invalid task name, it must contain more than 3 letters',
        'string.max':
        'Invalid task name, it must not contain more than 50 letters',
        'any.required': 'Task name is a required field',
      }),
    startDate: Joi.date(),
    workedHours: Joi.string()
      .pattern(/^[0-9]*$/)
      .max(3)
      .required()
      .messages({
        'string.max': 'Invalid number, it exceeds the number of posible worked hours',
        'string.pattern.base': 'Invalid, it must contain only interger numbers',
        'any.required': 'Worked hours is a required field',
      }),
    description: Joi.string().pattern(/(.*[a-zA-Z]){4}/).max(150).required()
      .messages({
        'string.pattern.base': 'Invalid description, it must contain at least 6 letters',
        'string.max':
        'Invalid description, it must not contain more than 150 letters',
        'any.required': 'Description is a required field',
      }),
    status: Joi.string()
      .min(2)
      .valid('Pending', 'Done', 'Unfinished')
      .required()
      .messages({
        'string.min': 'Invalid status, it must contain more than 2 letters',
        'any.valid':
          'Invalid status, it must be one of the following: To do, In progress, Review, Blocked, Done, Cancelled',
        'any.required': 'Status is a required field',
      }),
    isDeleted: Joi.boolean(),
  });

  const validation = taskValidation.validate(req.body);

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
    taskName: Joi.string().min(3).max(50).messages({
      'string.min': 'Invalid task name, it must contain more than 3 letters',
      'string.max':
        'Invalid task name, it must not contain more than 50 letters',
    }),
    startDate: Joi.date(),
    workedHours: Joi.string()
      .pattern(/^[0-9]*$/)
      .max(3)
      .messages({
        'string.max': 'Invalid number, it exceeds the number of posible worked hours',
        'string.pattern.base': 'Invalid, it must contain only interger numbers',
      }),
    description: Joi.string().pattern(/(.*[a-zA-Z]){4}/).max(150)
      .messages({
        'string.pattern.base': 'Invalid description, it must contain at least 6 letters',
        'string.max':
        'Invalid description, it must not contain more than 150 letters',
      }),
    status: Joi.string()
      .min(2)
      .valid('Pending', 'Done', 'Unfinished')
      .messages({
        'string.min': 'Invalid status, it must contain more than 2 letters',
        'any.valid':
          'Invalid status, it must be one of the following: To do, In progress, Review, Blocked, Done, Cancelled',
      }),
    isDeleted: Joi.boolean(),
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
