const knex = require('../../knex/knex');
const renderProductType = (req, res) => {
    res.render('pages/createType');
}
const renderProduct = async (req, res)=> {
    res.render('pages/createProduct')
    // await knex('productType').where({'product_type_id' : req.params.product_type_id}).select('product_type_id')
    // .then((result)=> {
    //    return res.render('pages/createProduct', {dt : result});
    // })
    // .catch((err) => {
    //     if (err) throw err;
    // })
}
const renderProductList = async (req, res) => {
    await knex('productType').select('*')
    .then((result) => {
        return res.render('pages/productList',{data: result});
    })
    .catch((err) => {
        if (err) throw err;
    })
}

module.exports = {
    renderProductType,
    renderProduct,
    renderProductList,

}