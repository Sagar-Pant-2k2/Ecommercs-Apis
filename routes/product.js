const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const productController = require('../controllers/product');

// getAllProducts
router.get('/',productController.getAllProducts);

//createProducts
router.post('/',tokenChecker,productController.createProduct);
     

//delete product from store
router.delete('/:productId',tokenChecker,productController.deleteProduct);

//empty store 
router.delete('/',tokenChecker,productController.emptyStore);


module.exports = router;