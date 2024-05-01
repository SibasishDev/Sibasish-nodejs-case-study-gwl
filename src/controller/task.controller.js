const taskValidation = require("./task.validation");
const { dbOpreation } = require("../modal/task.modal");
class TaskController {
  async createTask(req, res) {
    try {
      const { error, value } = taskValidation.createTaskValidation(req.body);

      if (error)
        return res
          .status(400)
          .json({ code: 422, message: error.details[0].message });

      const { title, description, dueDate } = value;

      const query = `INSERT INTO tasks (title, task_desc, due_date) 
        VALUES ('${title}', '${description}', '${dueDate}')`;

      const result = await dbOpreation(query);

      if (!result)
        return res.status(400).json({
          code: 400,
          message: "Some error occurered while creating task!",
        });

      return res.status(200).json({
        code: 201,
        message: "Task created successfully!",
        data: { id: result.insertId },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        code: 400,
        message: e.message,
      });
    }
  }

  async getTaskById(req,res){
    try{
        
    }catch(e){

    }
  }
}

module.exports = new TaskController();
