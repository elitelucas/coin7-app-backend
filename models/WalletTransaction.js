const mongoose = require('mongoose');
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

module.exports = mongoose.model('wallet_transaction', mySchema);