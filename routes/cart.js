const router = require('express').Router();
const tokenChecker = require('./jwtVerify');

const cart = require('../models/Cart');

//Get cart items
router.get('/',tokenChecker,(req,res)=>{
    const userCart = cart.findOne({
        userId = req.userId
    })
})

// Add an item to the cart
router.post('/:productId',tokenChecker,async(req,res)={
    
    const newCart
});



module.exports = router