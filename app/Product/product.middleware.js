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
    await knex('productType').where({product_type_id : req.params.product_type_id})
    .select('*')
    .then((result) => {
        return res.render('pages/ShowProduct',{data_ : result})
    })
}
const productPost = async (req, res) => {
    await knex('product').insert({
        product : req.body.product,
        price : req.body.price,
        color : req.body.color,
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
    // fullJoin
}