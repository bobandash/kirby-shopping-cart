var express = require('express');
var router = express.Router();
const productController = require('../controller/productController')
const productInstanceController = require('../controller/productInstanceController');
const categoryController = require('../controller/categoryController')

/*FOR THE ADMIN VIEW*/
router.get('/', productController.products_tabulated);
router.get('/edit/:id', productInstanceController.product_edit_get);
router.get('/add', productInstanceController.product_add_get);

/* FOR CATEGORY OPERATIONS */
router.get('/categories', categoryController.category_add_delete);
router.post('/categories', categoryController.category_add_post);
router.post('/categories/delete/:id', categoryController.category_delete_post)
router.post('/categories/update/:id', categoryController.category_update_post)

/* FOR PRODUCT OPERATIONS */
router.post('/products/delete/:id', productInstanceController.product_delete);
router.post('/edit/:id', productInstanceController.product_edit)
router.post('/add', productInstanceController.product_add_post)

/*FOR API CALLS*/
router.get('/api/featured/plush', productController.featured_plush_list);
router.get('/api/featured/game', productController.featured_games_list);
router.get('/api/products/:category', productController.products_list);

/* FOR INDIVIDUAL PRODUCT OPERATIONS */
router.get('/api/products/id/:id', productInstanceController.product_information)


module.exports = router;
