const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    status: {
        type: Boolean, default: false 
    },
    imgpath:String,
},
{timestamps:true}
);

const userModel=mongoose.model("userModel",userSchema)
module.exports=userModel;