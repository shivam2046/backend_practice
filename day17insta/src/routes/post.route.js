const express= require("express")
const postController= require("../controllers/post.controller")
const postRouter= express.Router()
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyuser=require("../middleware/post.middleware")


postRouter.post("/", upload.single("chacha"),identifyuser,postController.createpostController)
postRouter.get("/",identifyuser,postController.getallpost)
postRouter.get("/details/:postId",identifyuser,postController.getpostdetail)

module.exports=postRouter