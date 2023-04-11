
const User = require('../models/user.js');
const MiningTransaction = require('../models/MiningTransaction');
const MlmReferrals = require('../models/MlmReferrals');
const AdminSetting = require('../models/AdminSetting.js');

var processes = []; //{ user_id, mining_id, amount, time}
var mining_per_second;

(async () => {
    let row = await AdminSetting.findOne({ key: 'mining_per_second' });
    mining_per_second = row ? Number(row.value) : 0;
})();

exports.initMining = async () => {
    setInterval(() => {
        // console.log('mining running....')
        // console.log(processes)

        processes.map(async (item) => {
            /** TO DO - Blockchain code for mining */
            item.amount = mining_per_second + Number(item.amount)
            item.time++;

            if (item.time > 60 * 60 * 24) { //after 24hr from start
                this.endProcess(item.mining_id);

                let collection = await MiningTransaction.findOne({ _id: item.mining_id });
                collection.mining_amount = item.amount;
                collection.end_time = new Date(Date.now())
                collection.save();

                giveRewardToReferrers(item.user_id, item.amount, 'mining');
            }
        })
    }, 1000)
}

const giveRewardToReferrers = async (referee_id, deposit_amount, type) => {
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

//  add mining process 
exports.addProcess = async (user_id, mining_id) => {
    processes.push({ user_id, mining_id, amount: 0, time: 0 })
}

// remove mining process
exports.endProcess = async (mining_id) => {
    var index = -1;
    for (var i = 0; i < processes.length; i++) {
        if (processes[i].mining_id == mining_id) {
            index = i;
            break;
        }
    }
    if (index >= 0)
        processes.splice(index, 1);
}
exports.getMiningIDByUserID = (user_id) => {
    var process = processes.find((item) => item.user_id == user_id);
    return process ? process.mining_id : null;
}

exports.getMinedAmount = (mining_id) => {
    var process = processes.find((item) => item.mining_id == mining_id);
    return process ? process.amount : 0;
}
