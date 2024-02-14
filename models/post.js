const mongoose =require("mongoose");
const Schema =mongoose.Schema;
const postSchema=new Schema({
    body:String,
    permalink:String,
    title:String,
    tags:Array,
    comments:Array,
    date:Date,
});

const postModel =mongoose.model('post',postSchema,'sample_training.posts');
module.exports= postModel