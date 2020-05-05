const multer = require('multer');
const knex = require('../../../knex/knex');
// let upload = multer({ dest: 'upload/' }) tạo folder nếu ko tìm thấy folder.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
//upload image product.
let upload = multer({
    storage: storage,
})
// .array('img', 10);
.single('img');
const uploadImg = (req, res) => {
    upload(req, res, async (err) => {
        if (err) throw err;
        else {
            await knex('images').insert({
                    path: req.file.originalname,
                    product_id: req.body.product_id,
                }).then(async (result) => {
                    console.log(req.file);
                    const data_ = await knex('product')
                                        .innerJoin('images', 'product.product_id', 'images.product_id').select('*');
                    const data = await knex('productType').select('*');
                    return res.render('pages/products/productTab', {
                        data_,
                        data,
                    });
                })
                .catch(() => {
                    res.redirect('/product');
                });
        };
    });
};

const storages = multer.diskStorage({
    destination: function(req, files, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, files, cb) {
        cb(null, files.originalname);
    },
});

let uploads = multer({
    storage: storages,
})
.array('images', 10);
const uploadImgs = (req, res) => {
    uploads(req, res, (err) => {
        if (err) throw err;
        else {
            let arr = req.files;
            for ( let i of arr) {
                imgs = i.filename;
            }
            console.log(imgs);
            return res.json({ location: `/uploads/${imgs}`});
        }
    });
};

const PagesProduct = async (req, res) => {
    const data_ = await knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*');
    const data = await knex('productType').select('*');
    return res.render('pages/products/productTab', { data, data_ });
};
module.exports = {
    uploadImg,
    PagesProduct,
    uploadImgs,
};
