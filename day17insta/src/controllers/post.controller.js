
const postMoldel=require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req,res){
    

    const file= await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"chacha",
        foldername:"instaclone"
    })

    const userId= req.user.id
    const post= await postMoldel.create({
        caption:req.body.caption,
        imageurl:file.url,
        user:userId
    })
    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function getallpost(req,res){

    
    const userId=req.user.id
    const post=await postMoldel.find({
        user:userId
    })
    return res.status(201).json({
        message:"post fetched",
        post
    })
}

async function getpostdetail(req,res){
   
    
    const userId=req.user.id
    const postId=req.params.postId

    const post=await postMoldel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isvaliduser= post.user.toString()===userId
    if(!isvaliduser){
        return res.status(403).json({
            mesage:"not logged in or invalid token"
        })
    }
    res.status(201).json({
        message:"post fetched successfully",
        post
    })
}

module.exports={
    createpostController,
    getallpost,
    getpostdetail
}