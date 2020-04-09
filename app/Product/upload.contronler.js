const knex = require('../../knex/knex');
var flash = require('connect-flash');

var multer  = require('multer')
// var upload = multer({ dest: 'upload/' }) tạo folder nếu ko tìm thấy folder.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single('img');

const uploadImg = (req, res) => {
    upload(req, res,async (err) => {
        if(err) throw err;
        else {
            await knex('images').insert({
                path : req.file.originalname,
                product_id : req.body.product_id
            }).then((result) => {
                console.log(req.file);
                knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*').then((result) => {
                    return res.render('pages/productTab', {data_: result});
                });
            })
            .catch((err) => {
                return res.redirect('/product');
            });
        };
    });
};

const PagesProduct = (req, res) => {
    knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*').then((result) => {
        return res.render('pages/productTab', {data_: result});
    });
}
module.exports = {
    uploadImg,
    PagesProduct
}