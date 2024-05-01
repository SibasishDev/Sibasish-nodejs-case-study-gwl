const Router = require("express");
const taskController = require("../controller/task.controller");
class ApiRouter {

    constructor(){
        this.router = Router();
        this.init();
    }

    init(){

        this.router.post("/create-task", taskController.createTask);
        this.router.get("/get-task/:taskId", taskController.getTaskById);
        this.router.put("/update-task/:taskId", taskController.updateTask);
        this.router.delete("/delete-task/:taskId", taskController.deleteTask);
        this.router.get("/get-all-tasks", taskController.getAllTasks);
    }

    getRouter(){
        return this.router;
    }

}

module.exports = new ApiRouter();