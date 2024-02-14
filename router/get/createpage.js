const express =require('express')
const route = express.Router()
const path = require('path')
route.get('/create',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../views/pages/create.html'))
})

module.exports=route