const mongoose = require('mongoose');
var conn = require('../db/wallet');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        wallet_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        type: { type: String },
        amount: { type: Number },
        tx: { type: String },
        address: { type: String },
    },
    { timestamps: true }
);

module.exports = conn.model('wallet_transaction', mySchema);