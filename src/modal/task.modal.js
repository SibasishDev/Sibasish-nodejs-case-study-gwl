const db = require("../config/db.connection");
module.exports = {
    dbOpreation : (query) => {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
}
    