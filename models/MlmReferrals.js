const mongoose = require('mongoose');
var conn = require('../db/mlm');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        referrer_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        referee_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        deposit_amount: { type: Number },
        reward_amount: { type: Number },
        type: { type: String },
    },
    { timestamps: true }
);

module.exports = conn.model('mlm_referrals', mySchema);