const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products : [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                price : {
                    type: Number,
                    default:0,
                    required: true
                }
            },
        ],
        shippingAddress: {type:String,required:true,default:"campus shop"},
        paymentMethod: {type:String,required:true,enum:["cash on delivery","online payment"],default:"cash on delivery"},
        totalAmount : {
            type: Number,
            default : 0,
            required: true
        },
        status: {
            type:String,
            enum: ['Pending', 'Delivered', 'Cancelled'],
            default: 'Pending'
        }
},
{timestamps:true});

module.exports = mongoose.model("Order",orderSchema);
