const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleWare/check-auth');
const ProductController = require('../controllers/products');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // ACCEPT a file
        cb(null, true);
    } else {
        // reject a file
        cb(null, false);
    }


}

const upload = multer({
    storage: storage,
    limits: {
        size: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});




router.get('/', ProductController.Get_all_products);

router.post('/', checkAuth, upload.single('productImage') , ProductController.Products_create_product );

router.get('/:productID', ProductController.products_get_product); 

router.patch('/:productID', checkAuth, ProductController.products_update_product);

router.delete('/:productID', checkAuth, ProductController.products_delete_product);

module.exports = router;