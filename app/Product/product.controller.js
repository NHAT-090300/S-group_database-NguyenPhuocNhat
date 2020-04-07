const knex = require('../../knex/knex');

const renderProductList = (req, res) => {
    knex('productType').select('*')
    .then((result) => {
        res.render('pages/productList',{data: result})
    })
}
const renderProductType = (req, res) => {
    res.render('pages/createType');
}
const renderProduct = async (req, res)=> {
    await knex('productType').select('*').where('product_type_id' , req.params.product_type_id)
    .then((result)=> {
        console.log(result)
        res.render('pages/createProduct',{data__ : result});
    })
}

module.exports = {
    renderProductType,
    renderProduct,
    renderProductList,
}