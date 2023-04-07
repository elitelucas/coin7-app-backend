const mongoose = require('mongoose');
var conn = require('../db/wallet');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
        },

        pair: { type: String },
        type: { type: String },
        buysell: { type: String },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = conn.model('trading_order', mySchema);