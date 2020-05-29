const mongoose = require('mongoose');
var _eval = require("./eval");
var Schema = mongoose.Schema;
var sub = new Schema({
        "strikePrice": Number,
        "expiryDate": Date,
        "underlying": String,
        "identifier": String,
        "openInterest": Number,
        "changeinOpenInterest": Number,
        "pchangeinOpenInterest": Number,
        "totalTradedVolume": Number,
        "impliedVolatility": Number,
        "lastPrice": Number,
        "change": Number,
        "pChange": Number,
        "totalBuyQuantity": Number,
        "totalSellQuantity": Number,
        "bidQty": Number,
        "bidprice": Number,
        "askQty": Number,
        "askPrice": Number,
        "underlyingValue": Number
});

var stock = new Schema({
    "strikePrice": Number,
    "expiryDate": Date,
    "PE":sub,
    "CE": sub
});
stock.methods._eval = function(data,cb){
      cb(_eval(data));
};

module.exports = mongoose.model('Stock',stock);