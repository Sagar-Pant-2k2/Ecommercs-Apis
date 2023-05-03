const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');
const cartFunctions = require('../controllers/cart');

//Get cart items
router.get('/',tokenChecker,cartFunctions.getItems);
// Add an item to the cart
router.post('/addItems/:productId',tokenChecker,cartFunctions.addItem);
// delete item from cart
router.delete('/:id',tokenChecker,cartFunctions.delteItem);
//emptyCart 
router.delete('/',tokenChecker,cartFunctions.emptyCart);

module.exports = router