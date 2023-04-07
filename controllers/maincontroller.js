const mongoose = require('mongoose');
mongoose.set('debug', true);
const User = require('../models/user.js');
const Advertise = require('../models/Advertise');
const MiningTransaction = require('../models/MiningTransaction');
const MlmReferrals = require('../models/MlmReferrals');
const { LEVELS } = require('./config')
const { addProcess, endProcess, getMinedAmount } = require('../job/mining')

exports.ping = async (req, res) => {
    try {
        return res.json({ type: 'pong', message: 'Coin7 API 1.0 - dev branch started...' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.temp = async (req, res) => {
    try {
        var xxx = await _getRefereesByLevel('642d0d8840fb0a1168025ada', 1);

        return res.json({ result: true, data: xxx })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}


exports.mining_start = async (req, res) => {
    try {
        var { user_id } = req.body

        let last_mining = await MiningTransaction.findOne({ user_id }, {}, { sort: { createdAt: -1 } })
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
        addProcess(user_id, data._id);


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
                getMinedAmount(mining_id).then(async (mined_amount) => {
                    endProcess(mining_id);

                    var mining_amount = mined_amount;
                    collection.mining_amount = mining_amount;
                    collection.end_time = new Date(Date.now())
                    collection.save();

                    await _giveRewardToReferrers(user_id, mining_amount, 'mining')
                    return res.json({ result: true, data: collection.mining_amount, message: 'success' })
                });
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


exports.set_referrer = async (req, res) => {
    try {
        var { user_id, referrer } = req.body
        const referrerData = await User.findOne({ username: referrer });

        if (!referrerData) { return res.json({ result: false, message: 'Can not find referrer.' }); }

        await User.updateOne({ _id: user_id }, { referrer_id: referrerData.id }, { upsert: true });

        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}
const _getRefereesByLevel = async (user_id, level) => {
    let referees = [];
    for (var i = 1; i <= level; i++) {
        let uplevelReferees = [];
        if (i == 1) uplevelReferees = await User.find({ _id: user_id });
        else uplevelReferees = JSON.parse(JSON.stringify(referees));

        let uplevelReferees_id = [];
        uplevelReferees.map((item) => uplevelReferees_id.push(item.id))

        referees = await User.find({ referrer_id: { $in: uplevelReferees_id } });
    }
    return referees;
}

const _giveRewardToReferrers = async (referee_id, deposit_amount, type) => {
    const refereeData = await User.findOne({ _id: referee_id });
    if (!refereeData) return;

    const referrerData = await User.findOne({ _id: refereeData.referrer_id });
    if (!referrerData) return;

    var reward_amount;
    reward_amount = deposit_amount * 0.1;
    await new MlmReferrals({
        referrer_id: referrerData._id,
        referee_id: referee_id,
        deposit_amount: deposit_amount,
        reward_amount: reward_amount,
        type: type
    }).save();
    return;
}


exports.getNumberofReferees = async (req, res) => {
    try {
        var { user_id } = req.body
        let count_of_referees_by_level = [];
        var total = 0;
        for (var level = 1; level <= LEVELS; level++) {
            var referees = await _getRefereesByLevel(user_id, level);
            var count = referees.length || 0;
            count_of_referees_by_level.push(count);
            total += count;
        }
        return res.json({
            result: true, data: {
                total: total,
                levels: count_of_referees_by_level
            }
        })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.getRefereesbyLevel = async (req, res) => {
    try {
        var { user_id, level } = req.body
        var referees = await _getRefereesByLevel(user_id, level);
        return res.json({ result: true, data: referees })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.getRewardbyReferee = async (req, res) => {
    try {
        var { user_id, referee_id } = req.body
        var rewards = await MlmReferrals.find({ referrer_id: user_id, referee_id })

        return res.json({ result: true, data: rewards })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}
