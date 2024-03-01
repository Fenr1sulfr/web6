const { ObjectId } = require("mongodb");
const mongoose =require("mongoose");
const Schema =mongoose.Schema;
const postSchema=new Schema({
    author:String,
    body:String,
    comments:Array,
    date:Date,
    permalink:String,
    tags:Array,
    title:String,
});

const postModel =mongoose.model('posts',postSchema);
module.exports= postModel