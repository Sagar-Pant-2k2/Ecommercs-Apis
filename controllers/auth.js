const User = require('../models/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
const login = async (req,res)=>{
    const {userEmail,userPassword} = req.body;
    try{
        const user = await User.findOne({userEmail});
        if(!user) {
            return res.status(401).json({message: "Incorrect email or password"});
        }
        //now we will check if password matches
        const isPasswordMatch = await bcrypt.compare(userPassword,user.userPassword);
        if(!isPasswordMatch){
            return res.status(401).json({message: "Incorrect email or password"});
        }
        //if password matches we gonna send jsonwebToken to the client
        const token = jwt.sign({ userId: user._id, userName: user.userName ,userEmail: user.userEmail}, process.env.jwt_secret);
        res.status(200).header('Authorization', `Bearer ${token}`).json({ message: 'Login successful' });
    }
    catch(err){
        res.status(500).json({message : "error in login"});
    }
    console.log("welcome to login function");
}
module.exports = {
    register,
    login
}