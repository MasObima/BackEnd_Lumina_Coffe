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
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

    midtrans_url: {
        type: String,
    }
})

module.exports = mongoose.model("Transaction", userSchema)