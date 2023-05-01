const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const authRouter = require('./routes/auth')
app.use(express.json());
app.use('/api/v1/auth',authRouter);

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("connected to remove DB");
    app.listen(process.env.PORT || 3000,()=>{
    console.log("server listening at port 3000...");
})
})
.
catch(err =>{
    console.log("Error connecting to DB");
})
