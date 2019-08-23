var categoryModel = require('../../model/category');
module.exports = {
    createCategory: function createCategory(req, res, next) {

    },
    getCategories: async function getCaegories(req, res, next) {
        const data = {};
        try {
            const categoryData = await categoryModel.fetchCategories();
            console.log(categoryData);
            data.categories = categoryData;
        } catch (error) {
            console.error(error);
        }
        res.render('category', data);
    },
    addCatgory: function addCatgory(req, res, next) {
        res.render('addCategory');
    },
    saveCategory: async function saveCategory(req, res, next) {
        try {
            const { category } = req.body;
            const insertCat = await categoryModel.saveCategory(req.body);
            console.log(insertCat);
            res.status(200).send({message: 'Catgory inserted succesfully'});
        } catch (error) {
            console.error(error);
            res.status(500).send({error:true, message: error.message});
        }
    }
}