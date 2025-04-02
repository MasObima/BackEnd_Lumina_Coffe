const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is require"]
    },
    price: {
        type: Number,
        require: [true, "price is require"]
    },
    thumbnail: {
        type: String,
        require: true
    },
    cloudinaryId: {
        type: String
    }
})

module.exports = mongoose.model("product", userSchema)