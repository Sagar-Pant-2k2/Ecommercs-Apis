const userModel = require('../models/User');
const product = require('../models/Product');
const userCart = require('../models/Cart');


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
        try {
          const { name, email, password } = req.body;
          const user = await User.findById(req.userId);
          
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          user.name = name;
          user.email = email;
          if (password) {
            user.password = password;
          }
          
          await user.save();
          res.status(200).json({ message: 'Profile updated successfully' });
        } catch (err) {
          res.status(500).json({ message: 'Failed to update profile' });
        }  
}

//delete any profile (only admin can do that)
const deleteUserById = async (req,res)=>{
    try{
        const user = userModel.findById({ _id: req.userId});
        if(user && user.isAdmin){
            const toBeDeleted= await userModel.findById({_id: req.params.userID});
            if(toBeDeleted) {
                const cart = await userCart.findById({userId: req.params.userID});
                if(cart) {await userCart.findByIdAndDelete({userId: req.userID });}
                await userModel.findByIdAndDelete({_id: req.params.userID});
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
      const user = await userModel.findById(req.userId);
      const cart = await userCart.findById({userId: req.userId});
      if(cart) {await userCart.findByIdAndDelete({userId: req.userId });}

      if (user) {await userModel.findByIdAndDelete(req.userId); res.status(200).json({"message":"deleted user successfully"})}
      else {res.status(500).json({"message": "no such user exist"})}
    } catch (err) {
      res.status(500).json({ message: "Couldn't delete user: " + err });
    }
}

module.exports = {
    getAllUsers,
    deleteProfile,
    deleteUserById,
    editProfile
}