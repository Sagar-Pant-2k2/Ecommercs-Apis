const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');
const cartFunctions = require('../controllers/cart');

//Get cart items
router.get('/',tokenChecker,cartFunctions.getItems);
// Add an item to the cart
router.post('/:productId',tokenChecker,cartFunctions.addItem);
// delete item from cart
router.delete('/:id',tokenChecker,cartFunctions.delteItem);
//placeOrder
router.post('/order/:id',tokenChecker,cartFunctions.placeOrder);
//emptyCart 
router.delete('/',tokenChecker,cartFunctions.emptyCart);

module.exports = router