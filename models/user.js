const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type:String, required:true},
    userEmail: {type:String, required: true,unique:true},
    userPassword: {type:String, required: true},
    profilePic: {type:String},
    isAdmin: {type:Boolean,default:false}
},{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);