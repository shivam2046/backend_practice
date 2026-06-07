const app=require("./src/app")
const connect=require("./src/config/database")
require("dotenv").config()
connect()

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
    
})