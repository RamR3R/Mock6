const express = require("express");
const BlogModel = require("../Models/blog.model");

const BlogRouter = express.Router();

BlogRouter.post("/blogs",async(req,res)=>{
    try{
        req.body.date = Date.now();
        req.body.like = 0;
        req.body.Comment = [];
        const data = new BlogModel({...req.body});
        await data.save();
        res.status(201).json({message:"Blog Posted",data:data});
    }
    catch(err){
        res.status(400).json({err : err.message});
    }
});

BlogRouter.get("/blogs",async(req,res)=>{
    try{
        let q = {};
        let s = {};
        if(req.query.title)
        q.title = {$search : req.query.title};
        
        if(req.query.category)
        q.category = req.query.category;

        if(req.query.sort)
        s[req.query.sort] = req.query.order==="asc"?1:-1;
        
        const data = await BlogModel.find(q).sort(s);
        res.status(200).json({message : "Data fetched" , data :data});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

BlogRouter.patch("/blogs/:id",async(req,res)=>{
    try{
        let data = await BlogModel.find({_id:req.params.id});
        if(data.length)
        {
            if(data[0].userID === req.userID)
            {
                let obj = {
                    title : req.body.title,
                    content : req.body.content,
                    category : req.body.category,
                }
                const data = await BlogModel.findByIdAndUpdate(req.params.id,obj);
                res.status(203).json({message:"Data patched"});
            }
        }
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
})

BlogRouter.delete("/blogs/:id",async(req,res)=>{
    try{
        let data = await BlogModel.find({_id:req.params.id});
        if(data.length)
        {
            if(data[0].userID === req.userID)
            {
                const data = await BlogModel.findByIdAndDelete(req.params.id);
                res.status(203).json({message:"Data deleted",data : data});
            }
        }
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
})

BlogRouter.patch("/blogs/:id/like",async(req,res)=>{
    try{
        let data = await BlogModel.find({_id:req.params.id});
        if(data.length)
        {
            let obj = {...data[0]._doc};
            obj.like++;
            console.log(obj);
            const out = await BlogModel.findByIdAndUpdate(req.params.id,obj);
            res.status(200).json({message:"Liked" , likes: obj.like});
        }
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
})

BlogRouter.patch("/blogs/:id/comment",async(req,res)=>{
    try{
        let data = await BlogModel.find({_id:req.params.id});
        if(data.length)
        {
            let obj = {...data[0]._doc};
            let c = obj.Comment;
            c.push({
                userID : req.body.userID,
                name : req.body.name,
                content : req.body.content
            });
            console.log(c);
            const out = await BlogModel.findByIdAndUpdate(req.params.id,obj);
            res.status(200).json({message:"Commented" , comment: c});
        }
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
})


module.exports = BlogRouter;