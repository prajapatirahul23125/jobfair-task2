const express=require('express');
const route=express();
const d=require('../controllers/userController')
const imageUplod=require('../middleware/imageUplod');
const {addUserValidation}=require('../validation/users/user.validation')
route.post('/user',imageUplod.single('imgfile'),addUserValidation,d.createuser)
route.get('/user',d.getuser)
route.delete('/user/:id',d.deleteuser)
route.delete('/user',d.deleteMultiuser)
route.put('/user/:id',imageUplod.single('imgfile'),d.updateuser)

module.exports=route;