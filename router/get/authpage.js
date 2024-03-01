const express =require('express')
const route = express.Router()
const path = require('path')
route.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../views/pages/auth.html'))
})

module.exports=route