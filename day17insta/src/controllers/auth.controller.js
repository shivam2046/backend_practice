const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto= require("crypto")

async function registerController(req, res) {
    const { username, email, password, profileImage, bio } = req.body

    const isuser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isuser) {
        return res.status(409).json({
            message: (isuser.email == email ? "user already exist with this mail" : "user already exist with this username")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest('hex')

    const user = await userModel.create({
        username, email, password: hash, profileImage, bio
    })

     const token = jwt.sign({
        id: user._id,
        username:user.username,
        email: user.email
    }, process.env.JWT_SECRET)
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered successfully",
        user:
        {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    console.log(req.body);
console.log(email);

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({
            message: "user not exist with this email"
        })
    }
    
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const ispasswordmatched = user.password == hash
    if (!ispasswordmatched) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"user loggedIn",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports={registerController,loginController}


    