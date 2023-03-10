import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'
export const getPosts = async(req,res) =>{
    try{
        const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}
export const createPost = async(req,res) =>{
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
      await newPost.save();
      res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message})

    }
}

export const deletePost = async(req,res)=>{
    const {id} = req.params;
    if(!(mongoose.Types.ObjectId.isValid(id))) return res.status(404).send('post is not available with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({message:"post is successfully deleted"})
}