const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');
const cartFunctions = require('../controllers/cart');


//placeOrder
router.post('/placeOrder',tokenChecker,cartFunctions.placeOrder);

// Add an item to the cart
router.post('/:productId',tokenChecker,cartFunctions.addItem);
// delete item from cart
router.delete('/:productId',tokenChecker,cartFunctions.delteItem);

//emptyCart 
router.delete('/',tokenChecker,cartFunctions.emptyCart);
//Get cart items
router.get('/',tokenChecker,cartFunctions.getItems);
module.exports = router