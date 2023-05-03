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
        else {json.status(402).json({"message": "you are not authenticated"})};
    } catch (error) {
        json.status(500).json({"message":"internal server error can't get all orders"});
    }
}


//updateOrderStatus(admin only)
const updateOrderStatus = async (req,res)=>{
    try {
        const user = userModel.find({_id:req.userId});
        if(user && user.isAdmin){
            const orders = await orderModel.find();
            res.status(200).json({"orders":orders});
        }
        else {json.status(402).json({"message": "you are not authenticated"})};
    } catch (error) {
        json.status(500).json({"message":"internal server error can't get all orders"});
    }
}


//getOrder(only user can)
const getAllOrder = async (req,res)=>{
    try {
        const user = userModel.find({_id:req.userId});
        if(user && (!user.isAdmin)){
            const orders = await orderModel.find({});
            res.status(200).json({"orders":orders});
        }
        else {json.status(402).json({"message": "you are not authenticated"})};
    } catch (error) {
        json.status(500).json({"message":"internal server error can't fetch your orders"});
    }
}

//placeOrer
const placeOrder = async (req,res)=>{
    user: req.bod,
    products : [
        {
            product : {
                type:Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type:Number,
                required: true
            }
        }
    ],
    totalAmount : {
        type: Number,
        required: true
    },
    status: {
        type:String,
        enum: ['Pending', 'Delivered', 'Cancelled'],
        default: 'pending'
    }
}

//cancelOrder

module.exports = {
    placeOrder,
    cancelOrder,
    getOrder,
    getAllOrders,
    updateOrderStatus
}