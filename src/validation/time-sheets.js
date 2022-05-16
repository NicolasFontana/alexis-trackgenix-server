import Joi from 'joi';
import { now } from 'mongoose';

const updateValidation = (req, res, next) => {
  const timeSheetSchema = Joi.object({
    description: Joi.string(),
    date: Joi.date().max(now),
    task: Joi.string().alphanum().length(24),
    validated: Joi.boolean(),
    employee: Joi.string().alphanum().length(24),
    project: Joi.string().alphanum().length(24),
    projectManager: Joi.string().alphanum().length(24),
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM'),
  });
  const validation = timeSheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Please check your fields',
      error: validation.error,
    });
  }
  return next;
};

export default {
  updateValidation,
};
