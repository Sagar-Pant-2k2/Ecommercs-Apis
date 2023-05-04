const { json } = require('express');
const orderModel = require('../models/Order');
const userModel = require('../models/User');
const productModel = require('../models/Product');
const Cart = require('../models/Cart');


//getAllOrders(admin only)
const getAllOrders = async (req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.userId});
        if(user && user.isAdmin){
            const orders = await orderModel.find();
            res.status(200).json({"orders":orders});
        }
        else {res.status(402).json({"message": "you are not authenticated"})};
    } catch (error) {
        json.status(500).json({"message":"internal server error can't get all orders"});
    }
}


//updateOrderStatus(admin only) mark as delivered
const updateOrderStatus = async (req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.userId});
        // console.log(user);
        if(user && user.isAdmin){
            const order = await orderModel.findOne({_id : req.params.orderId});
            if(!order) {return res.status(404).json({"message":"no such order"})}
            order.status = "Delivered";
            await order.save();
            res.status(200).json({"message":"successfully delivered product"});
        }
        else {res.status(402).json({"message": "you are not authenticated (delivery)"})};
    } catch (error) {
        res.status(500).json({"message":"can't set it to delivered" + error});
    }
}




//cancelOrder
// user can only do this for pending orders
// add items back to available products too
const cancelOrder = async (req,res)=>{
    try{
        const user  = await userModel.findOne({_id:req.userId});
        if(user && !user.isAdmin){

            const order = await orderModel.findOne({_id: req.params.orderId});
            if(!order) {return res.status(400).json({"message":"no such orders"})}
            if(order.status === "Pending"){
                order.status = "Cancelled";
                //let add products back 
                order.products.forEach(async (element)=>{
                    try{   
                        const Product = await productModel.findOne({_id:element.product});
                    }
                    catch(err){
                        return res.status(404).json({"message":"some error occured"});
                    }
                })
                await order.save();
                res.status(200).json({"message":"successfully canceled the order"});
            }
            else{ res.status(401).json({"message":"you can't cancel order which is not pending"}); }
        }
        else{ res.status(401).json({"message":"you can't cancel order"}); }
    }
    catch(error){
        res.status(500).json({"message":"could not cancel your order (internal error)"});
    }
}

//myOrders
const myOrders = async (req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.userId});
        if(user && !user.isAdmin){
            const orders = await orderModel.find({user: user});
            res.status(200).json({"orders":orders});
        }
        else{
            res.status(401).json({"message":"you are not authenticated"});
        }
    }
    catch(error){
        res.status(500).json({"message":"could not get your orders (internal error)" + error.message});
    }
}


module.exports = {
    // placeOrder,
    // cancelOrder,
    cancelOrder,
    myOrders,
    getAllOrders,
    updateOrderStatus
}