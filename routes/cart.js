const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');

//Get cart items

router.get('/',tokenChecker,async(req,res)=>{
    try{
        const userCart = await Cart.findOne({userId :req.userId}).populate('items.product','name quantity price');
        if(!userCart) { res.status(200).json({message:"Cart is empty"}) }
        else {res.status(200).json((userCart)); } 
    }
    catch(err){ res.status(500).json({message:"Can't fetch cart items"}); }
});

// Add an item to the cart
router.post('/addItems/:productId',tokenChecker,async(req,res)=>{ 
    // const user = User.findOne({_id: req.userId});
    try{
    let cart = await Cart.findOne({ userId: req.userId });
    if(cart === null){
        cart = new Cart({
            userId: req.userId, 
            items: [],
        });
    }
    cart.items.push({
        product: req.params.productId,
        quantity: req.body.quantity,
        price: req.body.price   
    });
    
    await cart.save();
    return res.status(200).json({message: "item added to cart"});
    }
        
    
    catch(err){
        res.status(500).json({"message":"yhn pe hai internal server error" + err.message});
    }
});

//update items in cart


// delete items from cart

//emptyCart 
router.delete('/')

module.exports = router