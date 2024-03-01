const express = require('express')
const router=express.Router()
const db = require(`../../server`)
const UserModel=require('../../models/user')
const PostModel = require('../../models/post')

router.get('/retrieve',async(req,res)=>{
    if(req.query.username){
        user=req.query.username
        data = await (UserModel.findOne({username:user}).exec())
        res.json(data)
    }
    else{
        data = (await UserModel.find({}))
        res.json(data)
    }
})



module.exports=router