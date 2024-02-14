const express =require("express")
const {connectDB,getDB}=require('./db')
const PORT =3000;
const bodyParser=require(`body-parser`)
const app =express()
app.use(bodyParser.json())
//Routes
const createRoute = require('./router/post/create')
const retrieveRoute=require('./router/get/retrieve')
const homeRoute=require('./router/get/homepage')
const createUserRoute=require('./router/get/createpage')
//
let db;
app.use('/',createRoute)
app.use('/',retrieveRoute)
app.use('/',homeRoute)
app.use('/',createUserRoute)
connectDB((err)=>{
  if(!err){
    app.listen(PORT,(err)=>{
      err?console.log(err):console.log(`Listening ${PORT} port`)
    });
    db=getDB()
  }else{
    console.log(`Db connect error${err}`)
  }
})


