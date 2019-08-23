var express = require('express');
var router = express.Router();
var Category = require('../controller/categroy');
var Products = require('../controller/product')
router.get('/category', Category.getCategories);
router.get('/products', Products.getProducts);
router.get('/add-category', Category.addCatgory);
router.get('/add-product', Products.addProduct);
router.get('/delete-product', Products.deleteProduct);
router.post('/save-category', Category.saveCategory);
router.post('/save-product', Products.saveProduct);
/* GET home page. */
router.get('/', Products.getProducts);

module.exports = router;
