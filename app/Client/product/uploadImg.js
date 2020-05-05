const knex = require('../../../knex/knex');
const multer = require('multer');
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

const uploadImg = (req, res) => {
    upload(req, res, async (err) => {
        if (err) throw err;
        else {
            await knex('images').insert({
                    path: req.file.originalname,
                    product_id: req.body.product_id,
                }).then(async (result) => {
                    console.log(req.file);
                    const dataType = await knex('productType').select('*');
                    const data = await knex('product').innerJoin('images', 'product.product_id', 'images.product_id').select('*')
                        return res.render('pages/client/clientProduct', {
                            layout: false,
                            data,
                            dataType,
                        });
                }).catch(() => {
                    return res.redirect('/client_product');
                });
        }
    });
};
// upload img tinyMCE
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
}).array('images', 10);
const uploadImgs = (req, res) => {
    uploads(req, res, (err) => {
        if (err) throw err;
        else {
            console.log(req.files);
            let arr = req.files;
            for ( let i of arr) {
                imgs = i.filename;
            }
            console.log(imgs);
            return res.json({ location: `/uploads/${imgs}`});
        }
    });
};


module.exports = {
    uploadImg,
    uploadImgs,
};
