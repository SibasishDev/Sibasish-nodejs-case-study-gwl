const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const apiRouter = require("./routes/api.router");

class App {
    constructor(){
        this.app = app;
        this.port = process.env.PORT || 8080;
    }

    init(){
        this.addMiddlewarRoutes(this.app);
        this.listenToPort(this.app, this.port);
    }

    addMiddlewarRoutes(app){
        app.use(express.json(),express.urlencoded({extended : false}));
        app.use(cors());
        app.use(helmet());

        require("./config/db.connection");

        app.use("/api/v1", apiRouter.getRouter());

        app.use("*", (req, res) => {
            return res.status(404).json({
                code : 404,
                message : "Not found!"
            })
        });

        app.use((err, req, res, next) => {
            return res.status(err.status || 500).json({
                code : err.status || 500,
                message : err.message || "Internal Server Error!"
            })
        })
    }

    listenToPort(app, port){
        app.listen(port, () => {
            console.log(`Server is running on port at :  ${port}`);
        });
    }
}

module.exports = new App();