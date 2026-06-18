const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:"Hi user"
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel;