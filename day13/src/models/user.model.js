const mongoose= require("mongoose")

const userschema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
    },
    password:String,
})

const userModel=mongoose.model("user",userschema)

module.exports=userModel;