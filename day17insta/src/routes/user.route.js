const express= require("express")
const identifyuser= require("../middleware/post.middleware")
const userController= require("../controllers/user.controller")

const userRouter=express.Router();
userRouter.post("/follow/:username",identifyuser,userController.followusercontroller)
userRouter.post("/unfollow/:username",identifyuser,userController.unfollowusercontroller)


module.exports= userRouter