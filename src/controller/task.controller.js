const taskValidation = require("./task.validation");
const { dbOpreation } = require("../modal/task.modal");
class TaskController {
  async createTask(req, res) {
    try {
      const { error, value } = taskValidation.createTaskValidation(req.body);

      if (error)
        return res
          .status(400)
          .json({ code: 400, message: error.details[0].message });

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
        const {taskId} = req.params;

        if(!taskId) return res.status(400).json({
            code : 400,
            message : "Task id is required!"
        })

        const query = `SELECT * FROM tasks WHERE id = ${taskId}`;

        const result = await dbOpreation(query);

        console.log(result);

        if(!result.length) return res.status(200).json({
            code : 404,
            message : "Task not found!"
        })

        return res.status(200).json({
            code : 200,
            message : "Task found successfully!",
            data : result
        })
    }catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : e.message
        })
    }
  }

  async updateTask(req,res){
      try{
        const {taskId} = req.params;

        if(!taskId) return res.status(400).json({
            code : 400,
            message : "Task id is required!"
        });

        let query = `SELECT * FROM tasks WHERE id = ${taskId}`;

        const result = await dbOpreation(query);

        if(!result.length) return res.status(200).json({
            code : 404,
            message : "Task not found!"
        });

        const {error, value} = taskValidation.updateTaskValidation(req.body);

        if(error) return res.status(400).json({code : 400, message : error.details[0].message});

        const {title, task_desc, dueDate} = value;

         query = `UPDATE tasks SET `;

         if(title) query += `title = '${title}', `;

         if(task_desc) query += `task_desc = '${task_desc}', `;

         if(dueDate){
            const currentDate = new Date();

            const inputDueDate = new Date(dueDate);

            if(inputDueDate < currentDate) return res.status(400).json({ 
                code : 400,
                message : "Due date should be greater than current date!"
            });
            query += `due_date = '${dueDate}', `;
         } 

         query = query.slice(0, -2);

         query += `WHERE id = ${taskId}`;

         const updateResult = await dbOpreation(query);

         if(updateResult.affectedRows == 0) return res.status(200).json({
            code : 200,
            message : "Task not updated!"
        });

        return res.status(200).json({
            code : 200,
            message : "Task updated successfully!"
        })

      }catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : e.message
        })
      }
  }

  async deleteTask(req,res){
      try{
          const {taskId} = req.params;

          if(!taskId) return res.status(400).json({
              code : 400,
              message : "Task id is required!"
          });

        let query = `SELECT * FROM tasks WHERE id = ${taskId}`;

        const result = await dbOpreation(query);

        if(!result.length) return res.status(200).json({
            code : 404,
            message : "Task not found!"
        });

        await dbOpreation(`DELETE FROM tasks WHERE id = ${taskId}`);

        return res.status(200).json({
            code : 200,
            message : "Task deleted successfully!"
        })

      }catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : e.message
        })
      }
  }

  async getAllTasks(req,res){
      try{

        const query = `SELECT * FROM tasks order by id desc`;

        const result = await dbOpreation(query);

        if(!result.length) return res.status(400).json({
            code : 404,
            message : "No task found!"
        });

        return res.status(200).json({
            code : 200,
            message : "Task found successfully!",
            data : result
        })

      }catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : e.message
        })
      }
  }
}

module.exports = new TaskController();
