const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    const { username, email, password, bio, profileImg } = req.body;

    const isuseralready = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (isuseralready) {
        return res.status(409).json({
            message: (isuseralready.email == email ? "User already exist with this email" : "user already exist with this username")
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username, email, password: hash, bio, profileImg
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie("jwt_secret", token)

    res.status(201).json({
        message: "user registered successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg
    })
}

async function loginController(req, res) {
    const { username,email,password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "invalid username or password"
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const ispassword = hash == user.password
    if (!ispassword) {
        return res.status(404).json({
            message: "please enter a valid password"
        })
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie(token, "token")

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })

}

module.exports={registerController,loginController}

