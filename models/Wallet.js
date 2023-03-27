const mongoose = require('mongoose');
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

module.exports = mongoose.model('wallet', mySchema);