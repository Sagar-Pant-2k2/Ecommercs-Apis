const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    userId: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
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
                required: true
            }
        },
    ],
},
{timestamps: true});

module.exports = mongoose.model("Cart",cartSchema);