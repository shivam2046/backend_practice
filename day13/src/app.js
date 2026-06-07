const express= require("express")
const cookieparser=require("cookie-parser")
const authRouter=require("./routes/auth.route")



const app= express()

app.use(express.json())
app.use(cookieparser())
app.use("/api",authRouter)

module.exports=app

