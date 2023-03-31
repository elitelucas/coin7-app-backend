const mongoose = require('mongoose');
const axios = require('axios');
mongoose.set('debug', true);
const User = require('../models/user.js');
const Advertise = require('../models/Advertise');
const MiningTransaction = require('../models/MiningTransaction');
const { bltelecomsAPI } = require('../utils/bltelecomsAPI.js');

exports.ping = async (req, res) => {
    try {
        return res.json({ type: 'pong', message: 'Coin7 API 1.0 - dev branch started...' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.temp = async (req, res) => {
    try {
        var ddd = new Advertise({ title: 'cc' })
        await ddd.save();

        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}


exports.mining_start = async (req, res) => {
    try {
        var { user_id } = req.body

        let last_mining = await MiningTransaction.findOne({}, {}, { sort: { createdAt: -1 } })
        if (last_mining &&
            new Date(last_mining.createdAt).getTime() + 24 * 60 * 60 * 1000 > new Date(Date.now()).getTime() //check if after 24 hr from last transaction
        ) {
            return res.json({ result: false, message: 'Limit is 24hr' })
        }

        var mining_hash = Math.round(Math.random() * 1E9); // for now, fake
        let data = await MiningTransaction.create({
            user_id,
            mining_hash,
            start_time: new Date(Date.now())
        })
        /** Blockchain Code for Mining */
        return res.json({ result: true, data: data._id, message: 'mining_id' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.mining_stop = async (req, res) => {
    try {
        var { user_id, mining_id } = req.body;
        let collection = await MiningTransaction.findOne({ user_id, _id: mining_id });

        if (collection) {
            if (!collection.end_time) {
                collection.mining_amount = Math.round(Math.random() * 1E5) / 10000; //  for now, fake, background process
                collection.end_time = new Date(Date.now())
                collection.save();
                return res.json({ result: true, data: collection.mining_amount, message: 'success' })
            } else {
                return res.json({ result: false, message: 'Already stopped' })
            }
        } else {
            return res.json({ result: false, message: 'Mining not found' })
        }
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.mining_get = async (req, res) => {
    try {
        var { user_id } = req.body
        var records = await MiningTransaction.find({ user_id });
        return res.json({ result: true, data: records })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}
