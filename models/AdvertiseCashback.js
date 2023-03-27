const mongoose = require('mongoose');
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

module.exports = mongoose.model('advertise_cashback', mySchema);