const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        user_id: { type: String },
        mining_hash: { type: String },
        mining_amount: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model('mining_transaction', mySchema);