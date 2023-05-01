const User = require('../models/user');
const bcrypt= require('bcrypt');


const register = async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.userPassword,salt);
        const newUser = new User(
            {
                userName:req.body.userName,
                userEmail: req.body.userEmail,
                //password must be hashed before saving 
                userPassword: hashedPassword
            });

            
            //first we should check if user with same id exist
        const exist = await User.findOne({
            serEmail:req.body.userEmail
        })
            
        //saving newUser to database
        if(exist) {res.status(401).json({message : "user already exist"})}
        else{
            console.log("why this part even gets printed");
            createdUser = await newUser.save();
            res.status(201).json({message : "new user registered"});
            console.log(createdUser);
        }
        
    }
    catch(err){
        res.status(500).send("could not register");
    }
}
const login = async ()=>{
    console.login("welcome to login function");
}
module.exports = {
    register,
    login
}