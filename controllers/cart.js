const tokenChecker = require('../routes/jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');
const orderModel = require('../models/Order');
const Product = require('../models/Product');

//function to empty whole cart
const emptyCart = async(req,res)=>{
    try{
        const userCart = await Cart.findOne({userId :req.userId})
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
            const index = userCart.items.findIndex(item=>item.product._id.toString()===req.params.productId);
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
        const user = User.findOne({_id:req.userId});
        const Prod = await Product.findOne({_id: req.params.productId});

        //check if product exist or not 
        if(!Prod){return res.status(404).json({"message":"no such product available"})};
        //caclulate additional price
        
        const Price = (Number(req.body.quantity) * Number(Prod.price));
      
        if(user && !user.isAdmin){
            let cart = await Cart.findOne({ userId: req.userId });
            if(cart === null){      //if no cart create one
                cart = new Cart({
                userId: req.userId, 
                items: [],
                totalAmount : 0
            });
            }
            const idx = cart.items.findIndex(ele=>String(ele.product)===String(req.params.productId));

            //if item is is not present already
            if(idx===-1){
                cart.items.push({
                    product: req.params.productId,
                    quantity: req.body.quantity,
                    price: Price
                })
            }
            //if its present just increase quantity
            else {
                cart.items[idx].quantity+=(req.body.quantity);
                cart.items[idx].price+=Price;
            }
            let totalAmount = 0;
            cart.items.forEach(ele=>{totalAmount+=ele.price});
            cart.totalAmount=totalAmount;
            await cart.save();
            return res.status(200).json({message: "item added to cart"});     
        }
        else{ res.status(402).json({"message":"you can't add item "})}  
    }
    catch(err){
        res.status(500).json({"message":"yhn pe hai internal add item to cart server error " + err});
    }
}


//getItems 
const getItems = async(req,res)=>{
    try{
        const userCart = await Cart.findOne({userId :req.userId}).populate('items.product','name quantity price');
        if(!userCart || userCart.items.length===0) { res.status(200).json({message:"Cart is empty"}) }
        else {res.status(200).json({"cart":userCart}); } 
    }
    catch(err){ res.status(500).json({message:"Can't fetch cart items"}); }
}


//placeOrder
const placeOrder = async(req,res)=>{

    try{
        const user = await User.find({_id:req.userId});
        if(user && (!user.isAdmin)) {
            const userCart = await Cart.findOne({userId: req.userId});

            if(!userCart || userCart.items.length===0){
                return res.status(400).json({ message: "Your cart is empty" });
            }
            
            //total amount of items in cart
            let totalAmount = 0;
            userCart.items.forEach(ele=>{totalAmount+=ele.price});
            
            //create new order
            const newOrder = new orderModel({
                user: req.userId,
                products: userCart.items,
                totalAmount,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
              });
            
            //save newOrder
            await newOrder.save();

            //clearCart
            userCart.items = [];
            await userCart.save();
            res.status(200).json({"message":"placed order"});
        }
        else{
            res.status(402).json({"message":"you can't place order"})
        }
    }
    catch(err){
        res.status(500).json({"message":"internal server error in placing order"  + err.message});
    }
}

module.exports = {
    emptyCart,
    delteItem,
    addItem,
    getItems,
    placeOrder
}