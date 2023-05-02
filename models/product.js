const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name:{type: String, required: true},
    description: { type:String, required: true},
    category : { type:String,required },
    price : {type:Number,required:true},
    imageUrl: {type:String,required:true},
    quantity: {type:Number,default: 0},
});

module.exports = mongoose.model("Product",productSchema);
