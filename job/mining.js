var processes = [];

exports.initMining = async () => {
    setInterval(() => {
        // console.log('mining running....')
        // console.log(processes)

        processes.map((one) => {
            /** Blockchain code for mining */
            one.amount = Math.random() * 1E-4 + Number(one.amount)
        })
       
    }, 1000)
}

exports.addProcess = async (user_id, mining_id) => {
    processes.push({ user_id, mining_id, amount: 0 })
}

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

exports.getMinedAmount = async (mining_id) => {
    var process = processes.find((item) => item.mining_id == mining_id);
    return process ? process.amount : 0;
}
