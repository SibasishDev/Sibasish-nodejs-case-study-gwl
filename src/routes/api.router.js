const Router = require("express");
const taskController = require("../controller/task.controller");
class ApiRouter {

    constructor(){
        this.router = Router();
        this.init();
    }

    init(){

        this.router.post("/create-task", taskController.createTask);
        
        this.router.use("*", (req, res) => {
            return res.status(404).json({
                code : 404,
                message : "Not found!"
            })
        });
    }

    getRouter(){
        return this.router;
    }

}

module.exports = new ApiRouter();