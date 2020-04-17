let knex = require('../../../knex/knex');

const Product = async (req, res) => {
    let data= await knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*')
    return res.render('pages/client/clientProduct', {layout : false , data})
}

module.exports = {
    Product,
}