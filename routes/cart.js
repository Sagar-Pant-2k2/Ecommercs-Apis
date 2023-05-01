const router = require('express').Router();
const tokenChecker = require('./jwtVerify');

const cart = require('../models/cart');

// Add an item to the cart

router.post('/',tokenChecker,async(req,res)={
    
});