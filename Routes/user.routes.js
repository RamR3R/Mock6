const express = require("express");
const UserModel = require("../Models/user.model");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

UserRouter.post("/register",async(req,res)=>{
    try{
        let obj = {...req.body};
        bcrypt.genSalt(8, function(err, salt) {
            bcrypt.hash(obj.password, salt, async(err, hash)=>{
                if(err)
                res.send(err.message);
                obj.password = hash;
                const data = new UserModel(obj);
                await data.save();
                res.status(200).json({message : "User Registered",data:data});
            });
        })
        
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
});


UserRouter.post("/login",async(req,res)=>{
    try{
        let obj = {...req.body};
        const data =  await UserModel.find({email:obj.email});
        console.log(data[0],obj);
        if(!data.length)
        res.status(400).json({message :"Register first or enter valid mail id" });
        else
        bcrypt.compare(obj.password, data[0].password, function(err, result) {
            if(result)
            {
                var jwt = require('jsonwebtoken');
                var token = jwt.sign({name : data[0].name, id : data[0]._id}, "masai");
                res.status(200).json({message : "Logged in",token:token});
            }
            
            else
            res.status(400).json({message:"Enter valid password"});
        });
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
});


module.exports = UserRouter;