const midtransClient = require('midtrans-client');
const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { first_name, amount, product_id } = req.body;
        
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVERKEY
        });

        const order_id = "ORDER-" + new Date().getTime();

        const parameter = {
            transaction_details: { 
                order_id: order_id,
                gross_amount: amount
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: first_name,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        const transactionUrl = transaction.redirect_url;

        const newTransaction = new Transaction({
            ...req.body,
            Midtrans_url: transactionUrl,
            transaction_id: order_id
        });

        await newTransaction.save();
        res.status(200).json(newTransaction);
        
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};
