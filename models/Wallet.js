const mongoose = require('mongoose');
var conn = require('../db/wallet');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        coin: { type: String },
        balance: { type: Number },
    },
    { timestamps: true }
);

module.exports = conn.model('wallet', mySchema);