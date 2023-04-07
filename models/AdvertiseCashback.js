const mongoose = require('mongoose');
var conn = require('../db/ad');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        advertise_id: { type: String },
        user_id: { type: String },
        reward_amount: { type: Number },
        visitedAt: { type: Date },
    },
    { timestamps: true }
);

module.exports = conn.model('advertise_cashback', mySchema);