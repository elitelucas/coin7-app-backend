const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        title: { type: String },
        type: { type: String },
        Content: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('advertise', mySchema);