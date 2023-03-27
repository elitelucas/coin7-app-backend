const mongoose = require('mongoose');
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
    },
    { timestamps: true }
);

module.exports = mongoose.model('mlm_referrals', mySchema);