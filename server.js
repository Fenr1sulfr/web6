const express =require("express")
const {connectDB,getDB}=require('./db')
const PORT =3000;
const bodyParser=require(`body-parser`)

const helmet = require('helmet');
const app =express()
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// app.use(helmet({
//   contentSecurityPolicy: false,
// }))
//middleware
const authMiddle=require('./middleware/authmiddle')
//Routes
const createRoute = require('./router/post/create')
const retrieveRoute=require('./router/get/retrieve')
const homeRoute=require('./router/get/homepage')
const createUserRoute=require('./router/get/createpage')
const authPage=require('./router/get/authpage')
const authRoute=require('./router/get/auth')
const postRoute=require('./router/get/postpage')
//
let db;
app.use('/auth',authPage)
app.use('/api/auth',authRoute)
app.use('/',authMiddle,createRoute)
app.use('/',authMiddle,retrieveRoute)
app.use('/',authMiddle,homeRoute)
app.use('/',authMiddle,createUserRoute)
app.use('/post',authMiddle,postRoute)


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


