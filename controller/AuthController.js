const User = require('../models/User')
const jwt = require('jsonwebtoken')

//create jwt
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}

//sign in login
exports.signIn= async (req, res) => {
    console.log('req', req.body)
    const {email, password}= req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message: "User not found"})
        }
        else{
            if(user.password !==password){
                return res.status(401).json({message: "email dan password tidak tepat"})
            }
        }

//verifikasi password
        const isMatch = await user.matchPassword(password)
        if(isMatch){
            return res.status(401).json({message: "invalid cridential"})
        }

//buat token 
        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            token: generateToken(user._id)
        })

    }catch(error){
        res.status(500).json({error: "Gagal upload file"})
    }
}