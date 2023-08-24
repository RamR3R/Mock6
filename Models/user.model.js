const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    image : String,
    email : String,
    password : String
});


const UserModel = mongoose.model("user",userSchema);


module.exports = UserModel;