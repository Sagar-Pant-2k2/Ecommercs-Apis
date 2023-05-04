const { json } = require('express');
const orderModel = require('../models/Order');
const userModel = require('../models/User');


//getAllOrders(admin only)
const getAllOrders = async (req,res)=>{
    try {
        const user = userModel.find({_id:req.userId});
        if(user && user.isAdmin){
            const orders = await orderModel.find();
            res.status(200).json({"orders":orders});
        }
        else {res.status(402).json({"message": "you are not authenticated"})};
    } catch (error) {
        json.status(500).json({"message":"internal server error can't get all orders"});
    }
}


//updateOrderStatus(admin only)
const updateOrderStatus = async (req,res)=>{
    try {
        const user = userModel.findOne({_id:req.userId});
        if(user && user.isAdmin){
            const order = await orderModel.findOne({_id : req.orderId});
            order.status = req.body.orderStatus;
            res.status(200).json({"message":"success"});
        }
        else {res.status(402).json({"message": "you are not authenticated"})};
    } catch (error) {
        json.status(500).json({"message":"internal server error can't get all orders"});
    }
}


//getOrder(only user can) particular order
const getOrder = async (req,res)=>{
    try {
        const requestingUser = await userModel.findOne({_id:req.userId});
        if(requestingUser && (!requestingUser.isAdmin)){
            const order = await orderModel.findOne({user: requestingUser,_id: req.params.orderId});
            if(order){
                res.status(200).json({"orderDetails":order});
            }
            else{ res.status(401).json({"message":"no such order"}); }
        }
        else{ res.status(401).json({"message":"you ain't authenticated to get order details"}); }
    } catch (error) {
        json.status(500).json({"message":"internal server error can't fetch your orders"});
    }
}

//placeOrer
// const placeOrder = async (req,res)=>{
//     user: req.bod,
//     products : [
//         {
//             product : {
//                 type:Schema.Types.ObjectId,
//                 ref: 'Product',
//                 required: true
//             },
//             quantity: {
//                 type:Number,
//                 required: true
//             }
//         }
//     ],
//     totalAmount : {
//         type: Number,
//         required: true
//     },
//     status: {
//         type:String,
//         enum: ['Pending', 'Delivered', 'Cancelled'],
//         default: 'pending'
//     }
// }

//cancelOrder
// user can only do this for pending orders
const cancelOrder = async (req,res)=>{
    try{
        const requestingUser = await userModel.findOne({_id:req.userId});
        if(requestingUser && (!requestingUser.isAdmin)){
            const order = await orderModel.findOne({user: requestingUser,_id: req.params.orderId});
            if(order.status === "Pending"){
                order.status = "Cancelled";
                await order.save();
                res.status(200).json({"message":"successfully canceled the order"});
            }
            else{ res.status(401).json({"message":"you can't cancel order which is not pending"}); }
        }
        else{ res.status(401).json({"message":"you can't cancel order"}); }
    }
    catch(error){
        res.status(500).json({"message":"could not get your orders (internal error)"});
    }
}

//myOrders
const myOrders = async (req,res)=>{
    try{
        const requestingUser = await userModel.findOne({_id:req.userId});
        if(requestingUser && (!requestingUser.isAdmin)){
            const orders = await orderModel.find({user: requestingUser});
            res.status(200).json({"orders":orders});
        }
        else{
            res.status(401).json({"message":"you are not authenticated"});
        }
    }
    catch(error){
        res.status(500).json({"message":"could not get your orders (internal error)"});
    }

}


module.exports = {
    // placeOrder,
    // cancelOrder,
    getOrder,
    getAllOrders,
    myOrders,
}