var productModel = require('../../model/product');
var categoryModel = require('../../model/category');
module.exports = {
    getProducts : async function getProducts(req,res,next){
        var page;
        var total;
        var offset;
        if(req.query.page != undefined ){
            total = 5
            page =  parseInt(req.query.page)
            offset = (page - 1)*total

        }else{
            total = 5
            offset = 0
        }
        const data = {};
        try{
            const productData = await productModel.fetchproducts(offset,total)
            const productCount = await productModel.countproducts();
            const totalCount = productCount[0].total
            console.log('countt',totalCount)
            data.products = productData
            var itemPerPage = 5
            var totalPage = 1
            if(totalCount % itemPerPage == 0) {
                totalPage = totalCount / itemPerPage
            }else{
                var quotient =    ~~(totalCount/itemPerPage)
                var remain = totalCount % itemPerPage
                totalPage = quotient + 1

                console.log('conso',quotient)
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
    },
    deleteProduct: async function deleteProduct(req, res, next) {
        try {
            //console.log(req.body)
            const deleteProd = await productModel.deleteProduct(req.query.id);
            
            res.status(200).send({message: 'product deleted succesfully'});
        } catch (error) {
            console.error(error);
            res.status(500).send({error:true, message: error.message});
        }
    }
}