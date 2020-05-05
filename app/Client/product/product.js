const getSlug = require('speakingurl');
// const multer = require('multer');
const knex = require('../../../knex/knex');
// // let upload = multer({ dest: 'upload/' }) tạo folder nếu ko tìm thấy folder.
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({
//     storage: storage,
// }).single('img');

// const uploadImg = (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) throw err;
//         else {
//             await knex('images').insert({
//                     path: req.file.originalname,
//                     product_id: req.body.product_id,
//                 }).then(async (result) => {
//                     console.log(req.file);
//                     const dataType = await knex('productType').select('*');
//                     const data = await knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*')
//                         return res.render('pages/client/clientProduct', {
//                             layout: false,
//                             data,
//                             dataType,
//                         });
//                 }).catch(() => {
//                     return res.redirect('/client_product');
//                 });
//         }
//     });
// };

// render product tab
const Product = async (req, res) => {
    const data = await knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*');
    const dataType = await knex('productType').select('*');
    return res.render('pages/client/clientProduct', {
        layout: false,
        data,
        dataType,
    });
};
// render main page product
const pageProduct = async (req, res) => {
    const data1 = await knex('productType').select('*');
    return res.render('pages/client/setProduct', { layout: false, data1 });
};
// render page used to create the product type
const getProductType = (req, res) => {
    return res.render('pages/client/setProductType', { layout: false });
};
const setProductType = async (req, res) => {
    await knex('productType').insert({
        product_type: req.body.product_type,
        product_type_slug: `${getSlug(req.body.product_type)}-${Date.now()}`,
    })
    .then(() => {
        return res.redirect('/product');
    });
};
// render page used to create the product
const createProduct = async (req, res) => {
    const type = await knex('productType')
    .where({ product_type_slug : req.params.product_type_slug})
    .select('*');
    return res.render('pages/client/createProduct', { layout: false, type });
};
const setProduct = async (req, res) => {
    let post = await knex('product').insert({
        product: req.body.product,
        price: req.body.price,
        color: req.body.color,
        type_id: req.body.type_id,
        content: req.body.titleUser,
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

    return res.redirect('/product');
};
// render page upaloadImage
const getUploadImage = async (req, res) => {
    const products = await knex('productType')
        .rightJoin('product', 'productType.product_type_id', 'product.type_id')
        .where('productType.product_type_id', req.params.product_type_id);
    return res.render('pages/client/uploadImage', { layout: false, products });
};

// render pages buyProduct and note's user before buys the product.
const getBuyProduct = async (req, res) => {
    // select img
    const img = await knex('images').where({
        product_id: req.params.product_id,
    }).select('*');
    // select product
    const product_ = await knex('product').where({
        product_id: req.params.product_id,
    }).select('*');
    // show tag in product
    const showTag = await knex('post_tag')
    .rightJoin('tag', 'post_tag.tagID', 'tag.id')
    .leftJoin('product', 'post_tag.postID', 'product.product_id')
    .leftJoin('productType', 'product.type_id', 'productType.product_type_id')
    .where({ postID: req.params.product_id})
    console.log(showTag);
    return res.render('pages/client/buyProduct', {
        layout: false,
        img,
        product_,
        showTag,
    });
};
// post note's user to database
const setBuyProduct = (req, res) => {
    knex('comments').insert({
        content: req.body.titleUser,
        title_id: req.body.product_id,
    }).then(() => {
        return res.redirect('/client_product');
    });
};

// show a product type on desktop screen
const showCardAType = async (req, res) => {
    const data_ = await knex('product')
    .innerJoin('productType', 'product.type_id', 'productType.product_type_id')
    .innerJoin('images', 'product.product_id', 'images.product_id')
    .select('*');
    let data = data_.filter((a) => {
        return a.product_type_id == parseInt(req.params.product_type_id);
    });
    const dataType = await knex('productType').select('*');
    console.log(dataType);
    return res.render('pages/client/clientProduct', {
        layout: false,
        dataType,
        data,
    });
};

module.exports = {
    Product,
    pageProduct,
    setProductType,
    getProductType,
    createProduct,
    setProduct,
    getUploadImage,
    // uploadImg,
    getBuyProduct,
    setBuyProduct,
    showCardAType
};
