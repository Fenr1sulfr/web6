const express = require('express')
const router = express.Router()
const path = require('path')
const PostModel = require('../../models/post')
router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../views/pages/posts.html'))
})

router.patch('/getPosts',async(req,res)=>{
    try {
        const data = await PostModel.find({}).limit(10);
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports=router