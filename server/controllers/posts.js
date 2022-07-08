import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"


export const getPosts=async(req,res)=>{
   try {
    const postMessages=await PostMessage.find({})
    res.status(200).json(postMessages)
   }catch(error) {
    res.status(404).json({msg:error.message})
   }
}

export const getPostsBySearch=async(req,res)=>{
        try {
            const {searchQuery,tags}=req.query;
            console.log(tags);
           const tagArray=tags.split(",");
            
            const title=new RegExp(searchQuery,"i");
            const posts=await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
            console.log(tagArray)
            console.log(posts.tags)
            
            res.json({data:posts})
        }catch(err) {
            res.status(404).json({msg:err.message});
        }
}

export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err) {
        res.status(409).json({msg:err.message})
    }
}



export const updatePost=async(req,res)=>{
    const post=req.body;
    console.log(post);
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post with the id of ${_id}`)
    }

    const updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});

    res.json(updatedPost);

}

export const deletePost=async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post is found with id of ${_id}`)
    }

    await PostMessage.findByIdAndRemove(_id);
    res.status(200).json({msg:"post deleted succesfully"})
}


export const likePost=async(req,res)=>{
        if(!req.userId) return res.status(400).send("Not authenticated");
        const {id:_id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No post is found with id of ${_id}`)
        }

        const post=await PostMessage.findById(_id);

       const index=post.likes?.findIndex(like=>like===String(req.userId));
       console.log(index);
       if(index===-1) {
        post.likes.push(req.userId);
       }else{
        post.likes=post.likes.filter(like=>like!==String(req.userId));
       }
   
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true})
    res.json(updatedPost);

}







