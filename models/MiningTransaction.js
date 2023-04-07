const mongoose = require('mongoose');
var conn = require('../db/mining');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        user_id: { type: String },
        mining_hash: { type: String },
        mining_amount: { type: Number },
        start_time: { type: Date },
        end_time: { type: Date },
    },
    { timestamps: true }
);

module.exports = conn.model('mining_transaction', mySchema);