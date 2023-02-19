const CronJob = require("cron").CronJob;
const fs = require("fs");

const _server = require("./server");

// '0/15 9-16 * * 1-5',

async function dis(url) {
  let live = await _server.get_all_nse("/api/marketStatus");
  if (live.marketState[0].marketStatus != "Close") {
    let d = await _server.get_all_nse("api/option-chain-indices?symbol=" + url);
    fs.appendFile(
      "./server/data/" +
        new Date().toISOString().substr(0, 10) +
        "_" +
        url +
        ".txt",
      "\n" + JSON.stringify(d),
      (err) => {
        if (err) {
          console.log("err=>", err);
        } else {
          console.log("DONE", new Date().toString());
        }
      }
    );
  }
}
module.exports = {
  run_cron: function (url) {
    return new CronJob(
      "*/1 * * * *",
      function () {
        dis(url);
      },
      null,
      true,
      "Asia/Kolkata"
    );
  },
};
