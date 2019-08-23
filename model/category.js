var db = require('../dbConnect');
module.exports = {
    fetchCategories : async function fetchCategories() {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) {
                    return reject(err);
                }
                connection.query('SELECT * FROM  categories', (error, result) => {
                    connection.release();
                    if(error) {
                        return reject(error);
                    }
                    return resolve(result);
                })
            })
        });
    },
    saveCategory: async function saveCategory(data) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) {
                    return reject(err);
                }
                const sql  = `INSERT INTO categories(name) VALUES ('${data.category}')`;
                connection.query(sql, (error, result) => {
                    connection.release();
                    if(error) {
                        return reject(error);
                    }
                    return resolve(result);
                })
            })
        });
    }
}