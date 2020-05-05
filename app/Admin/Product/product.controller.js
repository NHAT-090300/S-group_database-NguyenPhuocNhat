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
// get Product type
const showProduct = async (req, res) => {
    const products = await knex('productType')
        .rightJoin('product', 'productType.product_type_id', 'product.type_id')
        .where('productType.product_type_slug', req.params.product_type_slug);
    console.log(products);
    return res.render('pages/products/ShowProduct', {
        products,
    });
};
// create product
const productPost = async (req, res) => {
    // add post and product
    let post = await knex('product').insert({
        product: req.body.product,
        price: req.body.price,
        color: req.body.color,
        type_id: req.body.type_id,
        content: req.body.title,
        product_slug: `${getSlug(req.body.product)}-${Date.now()}`,
    });
    // add tags 
    let tags = req.body.name.split(',');
    let setTag = [...new Set(tags)];
    for (i = 0; i < setTag.length; i++) {
        var tag = await knex('tag').insert({
            name: tags[i],
        });
        await knex('post_tag').insert({
            tagID: tag[0],
            postID: post[0],
        });
    };

    return res.redirect('/admin/product');
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
    // select image
    const img = await knex('images').where({
        product_id: req.params.product_id,
    }).select('*');
    // select product
    const product_ = await knex('product').where({
        product_slug: req.params.product_slug,
    }).select('*');
    // show comments of client
    const commentProduct = await knex('product')
    .innerJoin('comments', 'product.product_id', 'comments.title_id')
    .where({
        product_id: req.params.product_id,
    }).select('*');
    // show tag of product
    const showTag = await knex('post_tag')
    .rightJoin('tag', 'post_tag.tagID', 'tag.id')
    .leftJoin('product', 'post_tag.postID', 'product.product_id')
    .leftJoin('productType', 'product.type_id', 'productType.product_type_id')
    .where({ postID: req.params.product_id})
    console.log(showTag);
    return res.render('pages/products/updateProduct', {
        img,
        product_,
        commentProduct,
        showTag,
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

// show tag 

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
    // postTag,
};
