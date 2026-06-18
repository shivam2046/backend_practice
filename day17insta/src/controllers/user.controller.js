const followModel= require("../models/follow.model")
const userModel= require("../models/user.model")

async function followusercontroller(req,res){
    const followerusername=req.user.username
    const followeeusername= req.params.username
//user wants to follow self
    if(followerusername=== followeeusername){
        return res.status(400).json({
            message:"you can't follow youself"
        })
    }

    const isalreadyfollowing= await followModel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    //already following or not
    if(isalreadyfollowing){
        return res.status(200).json({
            message:"you are already following this user",
            follow:isalreadyfollowing
        })
    }
    //check for username for which follow request is coming

    const isfollowerexist= await userModel.findOne({
        username:followeeusername
    })
    if(!isfollowerexist){
        return res.status(404).json({
            message:"user you are trying to follow does not exist"
        })
    }

    const followrecord= await followModel.create({
        follower:followerusername,
        followee:followeeusername
    })
    res.status(201).json({
        message:`you are now following ${followeeusername}`,
        followrecord
    })
}

async function unfollowusercontroller(req,res){
     followerusername=req.user.username,
     followeeusername=req.params.username

    const isfollowing= await followModel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
//follower is following followee or not
    if(!isfollowing){
        return res.status(200).json({
            message:`you are not following ${followeeusername}`
        })
    }
    await followModel.findByIdAndDelete(isfollowing._id)

    res.status(200).json({
        message:`you have unfollowed ${followeeusername}`
    })

}

module.exports={
    followusercontroller,
    unfollowusercontroller
}