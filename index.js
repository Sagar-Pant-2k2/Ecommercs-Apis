const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const authRouter = require('./routes/auth');
const userRoute = require('./routes/user');
app.use(express.json());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRoute);

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("connected to remote DB");
    app.listen(process.env.PORT || 3000,()=>{
    console.log("server listening at port 3000...");
})
})
.
catch(err =>{
    console.log("Error connecting to DB");
})
