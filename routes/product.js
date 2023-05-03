const router = require('express').Router();
const jwtVerify = require('./jwtVerify');
const User = require('../models/User');
const Product = require('../models/Product');
const { verify } = require('jsonwebtoken');
const verifyToken = require('./jwtVerify');
const Cart = require('../models/Cart');
router.get('/',async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({"products": products});
});

router.post('/',jwtVerify,async (req,res)=>{
    
    try{
        const user = await User.findOne({
            _id : req.userId
        });
    
        if(user && user.isAdmin){
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                category : req.body.category,
                price : req.body.price,
                imageUrl: req.body.imageUrl,
                quantity: req.body.quantity,
            });
            await newProduct.save();
            return res.status(200).json({message: "new product has been added"});
        }
        else res.status(200).json({"message": "user is not an admin"});
    }
    catch(err){
        res.status(500).json({
            "message": "bro something is wrong"
        })
    }
    
});

//add to cart
router.post('/addToCart/:id',verifyToken,async (req,res)=>{
    const user = await User.findOne({
        _id: req.userId
    })
    try{
        if(user && (!user.isAdmin)){
            user.car
        }
        else{
            res.status(400).send("you ain't authenticated to add item to cart");
        }
    }
    catch(err){
        res.status(500).json({
            "message": "internal serever error"
        })
    }
    
});

//remove product from store
router.delete('/:id',(req,res)=>{

})



module.exports = router;