const express =require("express")
const router=express.Router()
const db=require('../../server')
const UserModel=require(`../../models/user`)
router.post('/createUser',async (req,res)=>{
    try{
        const newUser=await UserModel.create(req.body);
       newUser.save()
       .then((savedUser)=>{
        res.json(savedUser);
       })
       .catch(error=>{
        res.status(500).json({error:"Error saving"})
       })
    }
    catch(err){
        console.error(err);
        console.log("Internal server error")
    }
})
module.exports=router