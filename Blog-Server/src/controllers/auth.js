const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')

exports.signUp = async(req, res) => {
    try{
        const existsUser = await User.findOne({email : req.body.email})
        if(existsUser){
            return res.status(400).json({
                message : "User Already Exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({email : req.body.email, password : hashedPassword})
        await newUser.save()
        const accessToken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESS_SECRET, {expiresIn : '1d'});
        const refreshToken = jwt.sign({email : req.body.email}, process.env.JWT_REFRESH_SECRET, {expiresIn : '7d'});

        const dbRefreshToken = new RefreshToken({token : refreshToken, email : req.body.email, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
        await dbRefreshToken.save()

        return res.status(200).json({
            email : req.body.email,
            accessToken : accessToken,
            refreshToken : refreshToken
        })
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

exports.signIn = async(req, res) => {
    try{
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400).json({
                message : "User Doesn't exist! Please Sign Up!"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
            message: "Incorrect Password",
          });
        }

        const accessToken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESS_SECRET, {expiresIn : '1d'});
        const refreshToken = jwt.sign({email : req.body.email}, process.env.JWT_REFRESH_SECRET, {expiresIn : '7d'});

        const dbRefreshToken = new RefreshToken({token : refreshToken, email : req.body.email, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
                
        await RefreshToken.updateOne({email : req.body.email}, dbRefreshToken)

        return res.status(200).json({
            email : req.body.email,
            accessToken : accessToken,
            refreshToken : refreshToken
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

exports.refreshToken = async(req, res) => {
    const refreshToken = req.body.refreshToken
    try{
        const storedToken = await RefreshToken.findOne({token : refreshToken})
        if(!storedToken || new Date(storedToken.expiryDate) < new Date() || storedToken.email != req.body.email){
            return res.status(400).json({
                message : `Invalid Refresh Token`
            })
        }
        const accessToken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESS_SECRET, {expiresIn : '1d'});
        return res.status(200).json({
            accessToken : accessToken
        })
    }
    catch(error){
        return res.json(500).json({
            message : `Internal Server Error`
        })
    }
}

exports.signOut = async(req, res) => {
    if(req.body == {}){
        return res.sendStatus(500)
    }
    const refreshToken = req.body.refreshToken
    const email = req.body.email
    try{
        const response = await RefreshToken.deleteOne({refreshToken : refreshToken, email : email})
        if(response){
            return res.status(200).json({
                message: "Logged Out Successfully!"
            })
        }  
        else{
            return res.status(500).json({
                message : "Internal Server Error"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}