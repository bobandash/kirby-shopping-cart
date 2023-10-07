var express = require('express');
var router = express.Router();
const productController = require('../controller/productController')
const productInstanceController = require('../controller/productInstanceController');

/* FOR CATEGORY OPERATIONS */
router.get('/api/featured/plush', productController.featured_plush_list);
router.get('/api/featured/game', productController.featured_games_list);
router.get('/api/products/:category', productController.products_list);
/* FOR FEATURED PRODUCT OPERATIONS */



/* FOR INDIVIDUAL PRODUCT OPERATIONS */
router.get('/api/products/id/:id', productInstanceController.product_information)

module.exports = router;
