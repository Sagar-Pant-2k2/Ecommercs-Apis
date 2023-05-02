const router = require('express').Router();
const tokenChecker = require('./jwtVerify');

const cart = require('../models/cart');

//Get cart items
router.get('/',tokenChecker,(req,res)=>{
    const userCart = cart.findOne({
        userId = req.userId
    })
})

// Add an item to the cart
router.post('/',tokenChecker,async(req,res)={
    req.userId
});



module.exports = router