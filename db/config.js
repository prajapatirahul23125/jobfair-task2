const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL||"mongodb://127.0.0.1:27017/taskCrud").then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("db error");
})

module.exports=mongoose