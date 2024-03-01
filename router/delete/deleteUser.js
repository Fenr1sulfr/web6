const express =require('express')
const db =require('../../server')
const router = express.Router()
const UserModel = require('../../models/user')
const PostModel = require('../../models/post')
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.delete('/delete/:username', async (req,res)=>{
    const usernameToDelete = req.params.username;   
     try{
        const getUser=UserModel.findOne({usernameToDelete})
        if(!getUser){
            return res.status(400).json({message:"can't find user"});
        }
        const id = getUser._id
        const update = await UserModel.findByIdAndDelete(id);
        res.json("success!")
    }
    catch(err){
        console.log(err)
    }
})

