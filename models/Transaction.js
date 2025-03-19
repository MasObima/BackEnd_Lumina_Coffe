const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    transaction_id: {
        type: String
    },
    first_name: {
        type: String
    },
    amount: {
        type: Number,
    },
    product_id: {
        type: Number,
    },
    midtrans_url: {
        type: Number,
    }
})

module.exports = mongoose.model("Transaction", userSchema)