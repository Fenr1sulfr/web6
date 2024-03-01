const UserModel = require("../models/user")
const bcrypt=require("bcrypt")
const {validationResult}=require('express-validator')
const jwt = require("jsonwebtoken")
const {secret}=require('../config')
const cookie = require('cookie');
const generateAccessToken=(id)=>{
    const payload={
        id,
    }
    return jwt.sign(payload,secret,{expiresIn:"1h"})
}
class AuthContoller{
    async reqistratrion(req,res){
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Bad validation",errors})
            }
            const {username,password}=req.body
            const candidate = await UserModel.findOne({username})
            if(candidate){
                return res.status(400).json({message:" User already exists"})
            }
            const hashPassword =bcrypt.hashSync(password,7)
            const user =new UserModel({username,password:hashPassword})
            user.save()
            res.json("Success!")
        } catch (error) {
            console.log(error);
            res.status(400).json({message:"Registration erroe"})
        }
    }
    async login(req,res){
        try {
           
            const {username,password}=req.body
            const user = await UserModel.findOne({username})
            if(!user){
                return  res.status(400).json({message:"user doesn't exists"})

            }
            const validPassword=bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return  res.status(400).json({message:"wrong password"})

            }
            const token = generateAccessToken(user._id)
            const cookieOptions = {
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                path: '/',
            };
            const tokenCookie = cookie.serialize('jwt_token', token, cookieOptions);
            res.setHeader('Set-Cookie', tokenCookie);
            res.json({ token });
        } catch (error) {
            console.log(error);
            res.status(400).json({message:"login err"})
        }
    }
    // async getUsers(req,res){
    //     try {
    //         const users=await UserModel.find()
    //     } catch (error) {
    //         onsole.log(error);
    //         res.status(400).json({message:"get err"})
    //     }
    //         }
}

module.exports=new AuthContoller()