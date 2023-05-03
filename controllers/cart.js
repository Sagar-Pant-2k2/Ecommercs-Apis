const tokenChecker = require('../routes/jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');
const orderModel = require('../models/Order');
const Product = require('../models/Product');

//function to empty whole cart
const emptyCart = async(req,res)=>{
    try{
        const userCart = await Cart.findOne({userId :req.userId}).populate('items.product','name quantity price');
        if(!userCart) { res.status(200).json({message:"Cart is empty already empty"}) }
        else {
            userCart.items = [];
            await userCart.save();
            res.status(200).json((userCart)); 
        } 
    }
    catch(err){ res.status(500).json({message:"Can't fetch cart items"}); }
}

//delete item from the cart
const delteItem = async(req,res)=>{
    try{
        const userCart = await Cart.findOne({userId :req.userId}).populate('items.product','name quantity price');
        if(!userCart) { res.status(200).json({message:"Cart is empty already empty"}) }
        else {
            const index = userCart.items.findIndex(item=>item.product._id.toString()===req.params.id);
            if (index !== -1) {
                userCart.items.splice(index, 1);
                await userCart.save();
                res.status(200).json({ message: "Item removed from cart" });
              } else {
                res.status(404).json({ message: "Item not found in cart" });
              }
        }
            
    }
    catch(err){ res.status(500).json({message:"Can't remove that item"}); }
}

//addItem
const addItem = async(req,res)=>{ 
    
    try{
    let cart = await Cart.findOne({ userId: req.userId });
    if(cart === null){      //if no cart create one
        cart = new Cart({
            userId: req.userId, 
            items: [],
        });
    }
    cart.items.forEach(element => {
        if(element.productId)
    });
    if(index===-1){
            nprice = req.body.quantity* 
            cart.items.push({
            product: req.params.productId,
            quantity: req.body.quantity,
            price: req.body.price   
        });
    }
    else{
        cart.items[index].quantity++;
    }
    
    await cart.save();
    return res.status(200).json({message: "item added to cart"});
    }
        
    
    catch(err){
        res.status(500).json({"message":"yhn pe hai internal server error " + err});
    }
}


//getItems 
const getItems = async(req,res)=>{
    try{
        const userCart = await Cart.findOne({userId :req.userId}).populate('items.product','name quantity price');
        if(!userCart || userCart.items.length===0) { res.status(200).json({message:"Cart is empty"}) }
        else {res.status(200).json((userCart)); } 
    }
    catch(err){ res.status(500).json({message:"Can't fetch cart items"}); }
}

//placeOrder
const placeOrder = async(req,res)=>{
    try{
        const user = await User.find({_id:req.userId});
        if(user && (!user.isAdmin)) {
            const userCart = await Cart.findOne({userId: req.userId});
            if(!cart || cart.items.length===0){
                return res.status(400).json({ message: "Your cart is empty" });
            }

            //total amount
            let totalAmount = 0;
            for(const x of userCart.items){
                const item = await Product.findOne({_id:x.productId});
                if(!item){
                    return res.status(400).json({message:"one of the items in your cart is invalid"});
                }
                totalAmount += item.price * x.quantity;
            }

            //create new order
            const newOrder = new orderModel({
                user: req.userId,
                products: cart.products,
                totalAmount,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
              });

            //save newOrder
            await newOrder.save();

            //clearCart
            await Cart.findOneAndUpdate({user: req.userId},{items: []})
        }
        else{
            res.status(402).json({"message":"you can't place order"})
        }
    }
    catch(err){
        res.status(500).json({"message":"internal server error in placing order"});
    }
}

module.exports = {
    emptyCart,
    delteItem,
    addItem,
    getItems,
    placeOrder
}