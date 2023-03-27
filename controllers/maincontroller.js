const mongoose = require('mongoose');
const axios = require('axios');
mongoose.set('debug', true);
const User = require('../models/user.js');
const Transaction = require('../models/TradingOrder.js');
const { bltelecomsAPI } = require('../utils/bltelecomsAPI.js');

exports.ping = async (req, res) => {
    try {
        return res.json({ type: 'pong', message: 'Coin7 API 1.0' })
    } catch (error) {
        return res.json({ type: 'error', message: error.message })
    }
}

exports.temp = async (req, res) => {
    try {
        return res.json({ type: 'pong', message: 'Coin7 API 1.0' })
    } catch (error) {
        return res.json({ type: 'error', message: error.message })
    }
}
