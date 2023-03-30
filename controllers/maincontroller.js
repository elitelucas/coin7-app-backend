const mongoose = require('mongoose');
const axios = require('axios');
mongoose.set('debug', true);
const User = require('../models/user.js');
const Advertise = require('../models/Advertise');
const MiningTransaction = require('../models/MiningTransaction');
const { bltelecomsAPI } = require('../utils/bltelecomsAPI.js');

exports.ping = async (req, res) => {
    try {
        return res.json({ type: 'pong', message: 'Coin7 API 1.0 - dev branch' })
    } catch (error) {
        return res.json({ type: 'error', message: error.message })
    }
}

exports.temp = async (req, res) => {
    try {
        var ddd = new Advertise({ title: 'cc' })
        await ddd.save();

        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ type: 'error', message: error.message })
    }
}


exports.mining_start = async (req, res) => {
    try {
        var { user_id } = req.body
        var mining_hash = Math.round(Math.random() * 1E9);
        await MiningTransaction.create({
            user_id,
            mining_hash
        })
        /** Blockchain Code for Mining */
        return res.json({ result: true, data: mining_hash, message: 'mining_hash' })
    } catch (error) {
        return res.json({ result: false, data: error.message })
    }
}

exports.mining_end = async (req, res) => {
    try {
        var { user_id, mining_hash } = req.body
        var mining_amount = Math.round(Math.random() * 1E4);
        /** Blockchain Code for Mining */
        await MiningTransaction.updateOne({ mining_hash }, { mining_amount }, { upsert: true });

        return res.json({ result: true, data: mining_amount, message: 'mining_amount' })
    } catch (error) {
        return res.json({ result: false, data: error.message })
    }
}

exports.mining_get = async (req, res) => {
    try {
        var { user_id } = req.body
        var records = await MiningTransaction.find({ user_id });
        return res.json({ result: true, data: records })
    } catch (error) {
        return res.json({ result: false, data: error.message })
    }
}
