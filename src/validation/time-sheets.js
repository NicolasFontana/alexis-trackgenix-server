// import res from 'express/lib/response';
import Joi from 'joi';

// CREATE VALIDATION
const createTimeValidation = (req, res, next) => {
  const taskSchema = Joi.object({
    id: Joi.string().min(1).max(20).required(),
  });

  const employeeSchema = Joi.object({
    id: Joi.string().min(1).max(20).required(),
  });

  const projectSchema = Joi.object({
    id: Joi.string().min(1).max(20).required(),
  });

  const pmSchema = Joi.object({
    id: Joi.string().min(1).max(20).required(),
  });

  const timesheetValidation = Joi.object({
    description: Joi.string().min(20).max(150).required(),
    date: Joi.date().required(),
    task: Joi.array().items(taskSchema),
    validated: Joi.boolean().valid(true).required(),
    employee: Joi.array().items(employeeSchema),
    project: Joi.array().items(projectSchema),
    projectManager: Joi.array().items(pmSchema),
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
  });

  const validatorTimesheets = timesheetValidation.validate(req.body);

  if (validatorTimesheets.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validatorTimesheets.error.details[0].message,
    });
  }
  return next();
};

export default {
  createTimeValidation,
};
