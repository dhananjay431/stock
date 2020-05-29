const mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Cat',new Schema({
    name:String
}));