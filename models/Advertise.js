const mongoose = require('mongoose');
var conn = require('../db/ad');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        title: { type: String },
        type: { type: String },
        Content: { type: String },
    },
    { timestamps: true }
);

module.exports = conn.model('advertise', mySchema);