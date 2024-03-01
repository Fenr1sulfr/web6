const express =require('express')
const db =require('../../server')
const router = express.Router()
const UserModel = require('../../models/user')
const PostModel = require('../../models/post')
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.put('/editUser', async (req,res)=>{
    const {username,changeUsername}=req.body
    try{
        const getUser=UserModel.findOne({username})
        if(!getUser){
            return res.status(400).json({message:"can't find user"});
        }
        const id = getUser._id
        const update = await UserModel.findByIdAndUpdate(id,changeUsername,{new:true});
        res.json(update)
    }
    catch(err){
        console.log(err)
    }
})