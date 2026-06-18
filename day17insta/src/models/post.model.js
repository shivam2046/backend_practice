const mongoose=require("mongoose")

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageurl:{
        type:String,
        required:[true,"image url is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user id is required"]
    }

})

const postMoldel=mongoose.model("posts",postSchema)

module.exports=postMoldel