const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    name : String,
    userID : {type : mongoose.Types.ObjectId , ref: 'user'}, 
    title : String,
    content : String,
    category : String,
    date : Date,
    like : Number,
    Comment :[{
        userID : {type : mongoose.Types.ObjectId , ref: 'user'},
        name : String,
        content : String
    }]
});

const BlogModel = mongoose.model("blog",blogSchema);


module.exports = BlogModel;