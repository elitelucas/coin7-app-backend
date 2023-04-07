var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/coin7_mining');
mongoose.connection.on('error', console.log);
module.exports = conn;