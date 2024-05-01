const Joi = require("joi");

class TaskValidation {
  createTaskValidation(data) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      task_dec: Joi.string().required(),
      dueDate: Joi.date().required(),
    });

    return schema.validate(data);
  }

  updateTaskValidation(data) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30),
      task_desc: Joi.string(),
      dueDate: Joi.date(),
    }).or("title", "task_desc", "dueDate");

    return schema.validate(data);
  }
}

module.exports = new TaskValidation();
