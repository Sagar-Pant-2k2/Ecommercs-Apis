const router = require('express').Router();
const token = require('./jwtVerify');
const userModel = require('../models/User');
const product = require('../models/Product');


//get all users 
router.get('/',token,async (req,res)=>{
    const user = await userModel.findOne({
        _id : req.userId
    });
    // console.log(user);
    if(user && user.isAdmin) {
        userData = await userModel.find();
        res.status(200).json({
            userData
        })
    }
    else {
        res.status(400).json({message: "you are not authenticated"});
    }
});

//     TODO FUNCTIONS         

//additemtoCart
//delete user






module.exports = router;