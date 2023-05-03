const tokenChecker = require('../routes/jwtVerify');
const User = require('../models/User');
const Cart = require('../models/Cart');

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
    // const user = User.findOne({_id: req.userId});
    try{
    let cart = await Cart.findOne({ userId: req.userId });
    if(cart === null){
        cart = new Cart({
            userId: req.userId, 
            items: [],
        });
    }
    
    const index = cart.items.findIndex(item=>{
        return item.product.toString()===req.params.productId});
    if(index===-1){
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

module.exports = {
    emptyCart,
    delteItem,
    addItem,
    getItems
}