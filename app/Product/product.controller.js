const knex = require('../../knex/knex');
//pages product 
const renderProductList = (req, res) => {
    knex('productType').select('*')
    .then((result) => {
        res.render('pages/productList',{data: result})
    })
}
//create product type
const renderProductType = (req, res) => {
    res.render('pages/createType');
}
//create product
const renderProduct = async (req, res)=> {
    await knex('productType').select('*').where('product_type_id' , req.params.product_type_id)
    .then((result)=> {
        console.log(result);
        res.render('pages/createProduct',{data__ : result});
    })
}
// post product
const proTypePost = async(req, res) => {
    await knex('productType').insert({
        product_type: req.body.product_type
    })
    .then((result) => {
        return res.redirect('/product');
    })
    .catch((err) => {
        if (err) throw err;
    }); 
};
// get Product type id
const showProduct = async (req, res) => {
    const products = await knex('productType')
    .rightJoin('product', 'productType.product_type_id', 'product.type_id')
    .where('productType.product_type_id', req.params.product_type_id);
    console.log(products)
    return res.render('pages/ShowProduct', { products });
};

const productPost = async (req, res) => {
    await knex('product').insert({
        product : req.body.product,
        price : req.body.price,
        color : req.body.color,
        type_id : req.body.type_id 
    }).then((result) => {
        return res.redirect('/product');
    }).catch((err) => {
        if (err) throw err;
    })
}
// delerece product type
const proTypeDelete = async (req, res) => {
    await knex('productType').where({product_type_id: req.params.product_type_id}).delete();
    return res.redirect('/product');
}
module.exports = {
    renderProductType,
    renderProduct,
    renderProductList,
    proTypePost,
    productPost,
    proTypeDelete,
    showProduct
}