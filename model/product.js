var db = require('../dbConnect');

module.exports =  {
    fetchproducts : async function fetchproducts() {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) {
                    return reject(err);
                }
                connection.query('SELECT product_name,category_id,name FROM  products left join categories on products.category_id = categories.id', (error, result) => {
                    connection.release();
                    if(error) {
                        return reject(error);
                    }
                    console.log(result)
                    return resolve(result);
                })
            })
        });
    },

    saveProduct: async function saveProduct(data) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) {
                    return reject(err);
                }
                const sql  = `INSERT INTO products(product_name,category_id) VALUES ('${data.product}','${data.category_id}')`;
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