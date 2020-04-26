const getSlug = require('speakingurl');
const knex = require('../../../knex/knex');
// pages product;
const renderProductList = (req, res) => {
    knex('productType').select('*')
        .then((result) => {
            res.render('pages/products/productList', {
                data: result,
                success: req.flash('success'),
            });
        });
};
// create product type;
const renderProductType = (req, res) => {
    res.render('pages/products/createType');
};
// create product;
const renderProduct = async (req, res) => {
    await knex('productType').select('*')
        .where('product_type_slug', req.params.product_type_slug)
        .then((result) => {
            console.log(result);
            res.render('pages/products/createProduct', {
                data__: result,
            });
        });
};
// post productType
const proTypePost = async (req, res) => {
    await knex('productType').insert({
            product_type: req.body.product_type,
            product_type_slug: `${getSlug(req.body.product_type)}-${Date.now()}`,
        })
        .then(() => {
            return res.redirect('/admin/product');
        }).catch((err) => {
            if (err) throw err;
        });
};
// get Product type;
const showProduct = async (req, res) => {
    const products = await knex('productType')
        .rightJoin('product', 'productType.product_type_id', 'product.type_id')
        .where('productType.product_type_slug', req.params.product_type_slug);
    console.log(products);
    return res.render('pages/products/ShowProduct', {
        products,
    });
};

const productPost = async (req, res) => {
    await knex('product').insert({
        product: req.body.product,
        price: req.body.price,
        color: req.body.color,
        type_id: req.body.type_id,
        content: req.body.title,
        product_slug: `${getSlug(req.body.product)}-${Date.now()}`,
    }).then(() => {
        res.redirect('/admin/product');
    });
};
// delete product type
const proTypeDelete = async (req, res) => {
    await knex('productType').where({
        product_type_slug: req.params.product_type_slug,
    }).delete();
    req.flash('success', {
        msg: 'product type has been deleted',
    });
    return res.redirect('/admin/product');
};
//
const getProductId = async (req, res) => {
    const img = await knex('images').where({
        product_id: req.params.product_id,
    }).select('*');
    const product_ = await knex('product').where({
        product_slug: req.params.product_slug,
    }).select('*');
    const commentProduct = await knex('product')
    .innerJoin('comments', 'product.product_id', 'comments.title_id')
    .where({
        product_id: req.params.product_id,
    })
    .select('*');
    console.log(commentProduct);
    return res.render('pages/products/updateProduct', {
        img,
        product_,
        commentProduct,
    });
};

const deleteProduct = async (req, res) => {
    await knex('images').where({
        product_id: req.params.product_id,
    }).delete();
    await knex('product').where({
        product_id: req.params.product_id,
    }).delete();
    return res.redirect('/admin/product/upload');
};

// show a product type on desktop screen
const showCardAType = async (req, res) => {
    const data__ = await knex('product')
    .innerJoin('productType', 'product.type_id', 'productType.product_type_id')
    .innerJoin('images', 'product.product_id', 'images.product_id')
    .select('*');
    let data_ = data__.filter((a, b) => {
        return a.product_type_id == parseInt(req.params.product_type_id);
    })
    const data = await knex('productType').select('*');
    console.log(data_)
    return res.render('pages/products/showAtype', {
        data_,
        data,
    });
};

module.exports = {
    renderProductType,
    renderProduct,
    renderProductList,
    proTypePost,
    productPost,
    proTypeDelete,
    showProduct,
    getProductId,
    deleteProduct,
    showCardAType,
};
