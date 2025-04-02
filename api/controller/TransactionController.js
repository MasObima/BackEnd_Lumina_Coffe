const midtransClient = require('midtrans-client');
const Transaction = require('../models/Transaction');
const { default: mongoose } = require('mongoose');

exports.getTransaction = async (req, res) =>{
    try{
        const transaction = await Transaction.find()
        res.status(200).json(transaction)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.createTransaction = async (req, res) => {
    try {
        const { first_name, amount, product_id } = req.body;

        const validProductId = Number(product_id);

        
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
            midtrans_url: transactionUrl,
            transaction_id: order_id
        });

        await newTransaction.save();
        res.status(200).json(newTransaction);
        
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};
