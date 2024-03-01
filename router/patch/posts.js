const express = require('express')
const router=express.Router()
const db = require(`../../server`)
const UserModel=require('../../models/user')
const PostModel = require('../../models/post')

router.patch('/getPosts',async(req,res)=>{
    try {
        const data = await PostModel.find({});
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router
