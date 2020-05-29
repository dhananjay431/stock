const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
const Cat = require("./db/cat");
const Stock = require("./db/stock");
const _eval = require("./db/eval");
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/\www/\index.html"));
});

app.post('/', (req, res) => {
    const kitty = new Cat({ name: 'Zildjianeerwerwererwer345435' });
    kitty.save().then(() => {
        res.send({ success: "done!" });
    });
})

app.post('/stock/save', (req, res) => {
    const kitty = new Stock(req.body);
    kitty.save().then((resp) => {
        res.send(resp);
    });
});
app.post('/stock/find', (req, res) => {
    Stock.find(_eval(res.body)).exec((err, resp) => {
        res.send(resp);
    });
})
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));