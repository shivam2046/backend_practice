const mongoose= require("mongoose")

async function connect(){
    await mongoose.connect(process.env.MONGO_URI)
   .then(
    console.log("connected to db")
   ) 
} 
module.exports= connect