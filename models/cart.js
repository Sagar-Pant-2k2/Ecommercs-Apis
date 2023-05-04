const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
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
    totalAmount: {
        type:Number,
        required: true,
        default:0,
    }
},
{timestamps: true});

module.exports = mongoose.model("Cart",cartSchema);