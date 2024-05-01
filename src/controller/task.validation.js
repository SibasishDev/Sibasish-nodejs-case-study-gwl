const Joi = require("joi");

class TaskValidation {
    createTaskValidation(data) {
        const schema = Joi.schema({
            title : Joi.string().min(3).max(30).required(),
            description : Joi.string().required(),
            dueDate : Joi.date().required()
        });

        return schema.validate(data);
    }
}

module.exports = new TaskValidation();