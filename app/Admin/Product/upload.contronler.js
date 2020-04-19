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
let upload = multer({
    storage: storage,
}).single('img');

const uploadImg = (req, res) => {
    upload(req, res, async (err) => {
        if (err) throw err;
        else {
            await knex('images').insert({
                    path: req.file.originalname,
                    product_id: req.body.product_id,
                }).then((result) => {
                    console.log(req.file);
                    knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*').then((result) => {
                        return res.render('pages/products/productTab', {
                            data_: result,
                        });
                    });
                })
                .catch(() => {
                    return res.redirect('/product');
                });
        };
    });
};
const PagesProduct = (req, res) => {
    knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*').then((result) => {
        return res.render('pages/products/productTab', { data_: result });
    });
};
module.exports = {
    uploadImg,
    PagesProduct,
};
