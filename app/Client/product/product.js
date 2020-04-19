const knex = require('../../../knex/knex');
const multer = require('multer');
// let upload = multer({ dest: 'upload/' }) tạo folder nếu ko tìm thấy folder.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
}).single('img');

// render product tab
const Product = async (req, res) => {
    const data = await knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*');
    return res.render('pages/client/clientProduct', { 
        layout : false,
        data,
    });
};
// render main page product
const pageProduct = async (req, res) => {
    const data1 = await knex('productType').select('*');
    return res.render('pages/client/setProduct', {
        layout : false,
        data1,
    });
};
// render page used to create the product type
const getProductType = (req, res) => {
    return res.render('pages/client/setProductType', { layout : false });
};
const setProductType = async (req, res) => {
    await knex('productType').insert({
        product_type: req.body.product_type,
    })
    .then(() => {
        return res.redirect('/create_product');
    });
};
// render page used to create the product
const createProduct = (req, res) => {
    return res.render('pages/client/createProduct', { layout : false });
};
const setProduct = (req, res) => {
    knex('product').insert({
        product: req.body.product,
        price: req.body.price,
        color: req.body.color,
        type_id: req.body.type_id,
    }).then(() => {
        return res.redirect('/product');
    });
};
// render page upaloadImage
const getUploadImage = async (req, res) => {
    const products = await knex('productType')
        .rightJoin('product', 'productType.product_type_id', 'product.type_id')
        .where('productType.product_type_id', req.params.product_type_id);
    return res.render('pages/client/uploadImage', { layout : false, products });
};

const uploadImg = (req, res) => {
    upload(req, res, async (err) => {
        if (err) throw err;
        else {
            await knex('images').insert({
                    path: req.file.originalname,
                    product_id: req.body.product_id,
                }).then((result) => {
                    console.log(req.file);
                    let upload = knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*').then((result) => {
                        return res.render('pages/client/pages/client/clientProduct', {
                            layout: false,
                            upload,
                        });
                    });
                })
                .catch(() => {
                    return res.redirect('/client_product');
                });
        }
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
    uploadImg,
};
