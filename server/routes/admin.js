var express = require('express');
var router = express.Router();
const productController = require('../controller/productController')

/* GET home page. */

router.get('/api/products/:category', productController.products_list);

module.exports = router;
