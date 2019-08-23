var productModel = require('../../model/product');
var categoryModel = require('../../model/category');
module.exports = {
    getProducts : async function getProducts(req,res,next){
        const data = {};
        try{
            const productData = await productModel.fetchproducts()
            data.products = productData
            var itemPerPage = 5
            var totalPage = 1
            if(productData.length % itemPerPage == 0) {
                totalPage = productData.length / itemPerPage
            }else{
                var quotient =    ~~(productData.length/itemPerPage)
                var remain = productData.length % itemPerPage
                totalPage = conso + 1

                console.log('conso',conso)
                console.log(remain)
            }
            var pagingArr = []
            for (i=0; i<totalPage; i++){
                //let str = `<li class="page-item"><a class="page-link" href="#">${i+1}</a></li>`;
                pagingArr.push({no:i+1})
            }
            data.paging = pagingArr
        }catch (error) {
            console.error(error);
        }
       // console.log(data)
        res.render('index', data);
    },

    addProduct : async function addProduct(req,res,next){
        const data = {};
        try{
            const catData = await categoryModel.fetchCategories()
            data.categories = catData
        }catch(error){
            console.error(error);
        }
        res.render('addProduct',data);
    },
    saveProduct: async function saveProduct(req, res, next) {
        try {
            const { category } = req.body;
            const insertprod = await productModel.saveProduct(req.body);
            
            res.status(200).send({message: 'product inserted succesfully'});
        } catch (error) {
            console.error(error);
            res.status(500).send({error:true, message: error.message});
        }
    }
}