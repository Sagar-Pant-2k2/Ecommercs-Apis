const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
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
},
{timestamps:true});

module.exports = mongoose.model("Order",orderSchema);
