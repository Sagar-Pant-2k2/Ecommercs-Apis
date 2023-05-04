//TODO :function to edit products 
// as of now admin have to delete and create product again in order to edit it

const Cart = require('../models/Cart');
const productModel = require('../models/Product');
const userModel = require('../models/User');

//get all products
const getAllProducts = async (req,res)=>{
    try{
        const products = await productModel.find();
        res.status(200).json({productArray: products});
    }
    catch(err){
        res.status(500).json({message: "couldn't fetch the products"});
    }
}

//only admin can empty the store
const emptyStore = async (req,res)=>{
    try{

        const user = await userModel.findOne({_id:req.userId});
        if(user && user.isAdmin){
            await productModel.deleteMany();
            res.status(200).json({"message":"removed all items"});
        }
        else{
            res.status(401).json({"message":"you are not auhtenticated to empty the cart"});
        }
    }
    catch(err) {
        res.status(500).json({"message":"could not empty the cart"});
    }
}

//only admin can delete product
const deleteProduct = async (req,res)=>{
    const user = await userModel.findOne({_id:req.userId});
    if(user && user.isAdmin){
        await productModel.findOneAndDelete({_id:req.params.productId});
        res.status(200).json({"message":"removed item successfully"});
    }
    else{
        res.status(401).json({"message":"you are not auhtenticated to empty the cart"});
    }
}

//only admin can create product
const createProduct = async (req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.userId});
        if(user && user.isAdmin){
           
            const newProduct = new productModel({
                name: req.body.name,
                description: req.body.description,
                category : req.body.category,
                price : req.body.price,
                imageUrl: req.body.imageUrl,
                quantity: req.body.quantity,
            });
            await newProduct.save();
            res.status(200).json({"message":"successfully created a product"});

        }
        else{
            res.status(401).json({"message":"you are not auhtenticated to add product"});
        }
    }
    catch(err) {
        res.status(500).json({"message":"internal error couldnot create product"});
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    emptyStore,
    getAllProducts
}