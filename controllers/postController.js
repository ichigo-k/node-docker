import Post from "../models/postModel.js";

export async function getAllPosts(req,res){
    try{
        const posts = await Post.find({})
        res.status(200).json({success:true,results:posts.length, data: {posts}})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}

export async function getOnePost(req,res){
    try{
        const post = await Post.findById(req.params.id)
        if (!post) res.status(404).json({success: false, message:"Post not found"})
        res.status(200).json({success:true, data: {post}})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}

export async function createPost(req,res){
    try{
        const post = await Post.create(req.body)
        res.status(200).json({success:true, data: {post}, message: "Post created successfully "})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}

export async function updatePost(req,res){
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        })
        if (!post) res.status(404).json({success: false, message:"Post not found"})
        res.status(200).json({success:true, data: {post}, message: "Post updated successfully "})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}

export async function deletePost(req,res){
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) res.status(404).json({success: false, message:"Post not found"})
        res.status(200).json({success:true, message: "Post deleted successfully "})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}


