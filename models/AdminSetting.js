const mongoose = require('mongoose');
var conn = require('../db/main');

const Schema = mongoose.Schema;

const AdminSetting = new Schema({
  key: { type: String, required: true, }, //mining_per_second
  value: { type: Schema.Types.Mixed },
});

module.exports = conn.model('admin_setting', AdminSetting);
