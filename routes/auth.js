const User = require('../models/user');

const router = require('express').Router();

router.post('/register',async (req,res)=>{
    const newUser = new User({
        userName:req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    });
    try{

        //saving newUser to database

        //first we should check if user with same id exist
        const exist = await User.findOne({
            userEmail:req.body.userEmail
        })
        console.log("exist => " + exist);
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
})
module.exports = router;