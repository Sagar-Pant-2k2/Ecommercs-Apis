const userModel = require('../models/User');
const product = require('../models/Product');
const userCart = require('../models/Cart');
//forgetPassword**

//only admin can see list of users
const getAllUsers = async (req,res)=>{
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
}

//editProfile
const editProfile = async(req,res)=>{
    try{

        const user = await userModel.findOne({_id:req.userId});
        if(user){
            if(req.body.userName) user.userName=req.body.userName;
            if(req.body.userEmail) user.userEmail=req.body.userEmail;
            if(req.body.userPassword) user.userEmail=req.body.userPassword;
            await user.save();
            res.status(200).json({"message":"edited profile"});
        }
        else {
            res.status(404).json({"message":"no such user found"});
        }
    }
    catch(err){
        res.status(500).json({"message":"couldn't edit profile" + err});
        
    }
}

//delete any profile (only admin can do that)
const deleteUserById = async (req,res)=>{
    try{
        const user = await userModel.findOne({ _id: req.userId});
        if(user && user.isAdmin){
            const toBeDeleted= await userModel.findOne({_id: req.params.userID});
            if(toBeDeleted) {
                const cart = await userCart.findOne({userId: req.params.userID});
                if(cart) {await userCart.findOneAndDelete({userId: req.userID });}
                await userModel.findOneAndDelete({_id: req.params.userID});
                res.status(200).json({"message": "successfully deleted that user"});
            }
        }
        else{
            res.status(403).json({"message":"you ain't authorized"});
        }
    }
    catch (err) {
        res.status(500).json({ message: "Couldn't delete user: " + err });
     }
}


// delete profile
const deleteProfile = async (req, res) => {
    try {
      const user = await userModel.findOne({_id:req.userId});
      const cart = await userCart.findOne({userId: req.userId});
      if(cart) {await userCart.findOneAndDelete({userId: req.userId });}

      if (user) {await userModel.findOneAndDelete(req.userId); res.status(200).json({"message":"deleted user successfully"})}
      else {res.status(500).json({"message": "no such user exist"})}
    } catch (err) {
      res.status(500).json({ message: "Couldn't delete user: " + err });
    }
}

const getProfile = async(req,res)=>{
  try {
    const user = await userModel.findOne({_id:req.userId});
    console.log(user);
    if(user) {res.status(200).json({userData: user});}
    else {res.status(404).json({"message":"user not found"});}
  } catch (error) {
    res.status(500).json({"message":"internal error while fetching user Profile"});
  }
}
module.exports = {
    getAllUsers,
    deleteProfile,
    deleteUserById,
    editProfile,
    getProfile
}