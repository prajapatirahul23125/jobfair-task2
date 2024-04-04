const userModel=require('../models/userModel')
const fs=require('fs')

const getuser=async(req,res)=>{
    try{
        var search='';
        if(req.query.search){
            search=req.query.search;
        }
        var page='';
        if(req.query.page){
            page=req.query.page;
        }
        const limit=5;  
        const user=await userModel.find({
            $or:[
                {name:{$regex:'-*'+search+'-*',$options:'i'}},
                {email:{$regex:'-*'+search+'-*',$options:'i'}},
            ]
        })
        .limit(limit*1)
        .skip( page > 0 ? (page - 1) * limit : 0)
        .exec();
        const pagination=await userModel.find({
            $or:[
                {name:{$regex:'-*'+search+'-*',$options:'i'}},
                {email:{$regex:'-*'+search+'-*',$options:'i'}},
            ]
        }).countDocuments();
        res.status(200).send({
            user:user,
            totalpage:Math.ceil(pagination/limit),
            currentpage:page,
            previous:page-1,
            next:page+1,
        });
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Get User Error",
            err
        })
    }
}

const createuser=async(req,res)=>{
    try{
        const{name,email,phone,status}=req.body;
        const user=new userModel({
            name,email,phone,status,imgpath:req.file.path
        })
        await user.save();
        res.status(201).send({
            success:true,
            message:"User Created SuccessFully",
            user
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Create User Error",
            err
        })
    }

}

const deleteuser=async (req,res)=>{
    console.log("id",req.params.id);
    try{
        const deletefile=await userModel.findByIdAndDelete(req.params.id);
        fs.unlink(deletefile.imgpath,()=>{
            
        })
        res.status(200).send({
            success:true,
            message:"User Delete SuccessFuly"
        })
        
        
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Delete User Error",
            err
        })
    }
}

const deleteMultiuser=async(req,res)=>{
    try{
        const user=await userModel.deleteMany(req.body)
    res.json({msg:"Multiple user deleted"})
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Delete Multi User Error",
            err
        })
    }
    
}

const updateuser=async (req,res)=>{
    
    const {name,email,phone,status}=req.body;
    const id=req.params.id;
    try{
        if(req.file){
            var data={name:name,email:email,phone:phone,imgpath:req.file.path};
            const oldData= await userModel.findById(id)
            fs.unlink(oldData.imgpath,()=>{
            console.log("success");
        })
        }
        else{
            var data={name:name,email:email,phone:phone};
        }
        
        const updatedata=await userModel.findByIdAndUpdate(id,{name:name,email:email,phone:phone,status:status})
        res.status(201).send({
            success:true,
            message:"Update User SuccessFully",
            
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Update User Error",
            err
        })
    }

    
}

module.exports={createuser,getuser,deleteuser,updateuser,deleteMultiuser}