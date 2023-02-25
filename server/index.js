const express = require("express");
const bodyParser = require("body-parser");
const CronJob = require("cron").CronJob;
const fs = require("fs");
var cors = require("cors");
const _server = require("./server");
const require1 = require("./cron");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("server"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,PUT, POST,DELETE");
  next();
});

app.get("/", (req, res) => {
  res.json("wewerewrewr");
});
app.get("/nse", (req, res) => {
  res.json("hello world");
});

app.post("/nse", async (req, res) => {
  try {
    res.send(await _server.get_all_nse(req.body.url));
  } catch (error) {}
});

app.post("/money", async (req, res) => {
  let cookie = req.headers["money"];
  res.send(await _server.getRaw(req.body.url, cookie));
});

app.get("/getData/:id", async (req, res) => {
  //res.send({ body: req.body, params: req.params, query: req.query });

  fs.readFile(`/stock/server/data/${req.params.id}`, (err, data) => {
    if (err) {
      res.send([]);
      // throw err;
    } else {
      res.send(
        data
          .toString()
          .split("\n")
          .filter(Boolean)
          .map((d) => JSON.parse(d))
          .at(req.query.n)
      );
    }
  });
});

require1.run_cron("NIFTY");
require1.run_cron("BANKNIFTY");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
