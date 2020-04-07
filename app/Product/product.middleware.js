const knex = require('../../knex/knex');

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
const proTypeDelete = async (req, res) => {
    await knex('productType').where({product_type_id: req.params.product_type_id}).delete();
    return res.redirect('/product');
}
module.exports = {
    proTypePost,
    productPost,
    proTypeDelete,
    showProduct
}