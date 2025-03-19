const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is require"]
    },
    email: {
        type: String,
        require: [true, "email is require"],
        unique: true      
    },
    role: {
        type: String,
        require: [true, "role is require"]
    },
    password: {
        type: String,
        require: [true, "password is require"]
    }
})

module.exports = mongoose.model("User", userSchema)