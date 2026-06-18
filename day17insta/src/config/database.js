const mongoose= require("mongoose")

function connect() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db")
    })
}
module.exports=connect