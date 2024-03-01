const express= require('express')
const router=express.Router()
const db =require('../../server')
const UserModel=require('../../models/user')
const {check} = require('express-validator')

const contoller = require("../../controllers/auithControl")

router.post('/registration',[
    check('username','empty username').notEmpty(),
    check('password','password should be more than 4 and less than 10').isLength({min:4,max:10})
],contoller.reqistratrion)

router.post('/login',contoller.login)
// router.get('/users',contoller.getUsers)

module.exports=router