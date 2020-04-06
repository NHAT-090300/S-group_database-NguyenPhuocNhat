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
    res.render('pages/createProduct');
}

module.exports = {
    renderProductType,
    renderProduct,
    renderProductList,
}