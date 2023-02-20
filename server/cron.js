const CronJob = require("cron").CronJob;
const _ = require("lodash");
const fs = require("fs");
const _server = require("./server");
// '0/15 9-16 * * 1-5',

async function dis(url) {
  let live = await _server.get_all_nse("/api/marketStatus");
  if (live.marketState[0].marketStatus != "Closed") {
    let d = await _server.get_all_nse("api/option-chain-indices?symbol=" + url);

    save_file(
      `./server/data/${new Date().toISOString().substr(0, 10)}_${url}`,
      d
    );
    save_file(
      `./server/data/${new Date().toISOString().substr(0, 10)}_PCR_${url}`,
      get_data(d)
    );
  }
}
//"0/15 9-16 * * 1-5",
module.exports = {
  run_cron: function (url) {
    return new CronJob(
      "0/15 9-16 * * 1-5",
      function () {
        dis(url);
      },
      null,
      true,
      "Asia/Kolkata"
    );
  },
};
function save_file(file_name, data) {
  fs.appendFile(file_name, "\n" + JSON.stringify(data), (err) => {
    if (err) {
      console.log("err=>", err);
    } else {
      console.log("DONE", new Date().toString());
    }
  });
}

function getAllopData(_data) {
  debugger;
  return _.chain(_data.data.records.expiryDates)
    .take(4)
    .reduce((a, b) => {
      let t = {};
      a[b] = getexpiryData(b, _data);
      return a;
    }, {})
    .value();
}
function get_data(d) {
  d.records.data = d.records.data.map((d) => {
    if (d.PE != undefined) d.flag = d.PE.strikePrice > d.PE.underlyingValue;
    // d.flag = d.PE.underlyingValue - d.PE.strikePrice;
    return d;
  });
  let expiryData = getAllopData({ data: d });
  let expiryData_key = Object.keys(expiryData);
  let PCR = expiryData_key.reduce((a, d) => {
    let CE = _.chain(expiryData[d]).map("CE.openInterest").sum().value();
    let PE = _.chain(expiryData[d]).map("PE.openInterest").sum().value();
    let C_CE = _.chain(expiryData[d])
      .map("CE.changeinOpenInterest")
      .sum()
      .value();
    let C_PE = _.chain(expiryData[d])
      .map("PE.changeinOpenInterest")
      .sum()
      .value();
    a[d] = {
      PCR: Number(PE / CE).toFixed(2),
      C_PCR: Number(C_PE / C_CE).toFixed(2),
      TTL_CE: CE,
      TTL_PE: PE,
      TTL_C_CE: C_CE,
      TTL_C_PE: C_PE,
    };
    return a;
  }, {});
  let dt = {
    timestamp: d.records.timestamp,
    underlyingValue: d.records.underlyingValue,
    PCR,
  };

  return dt;
}
function getexpiryData(expiryDate, _data) {
  let temp_data = _.chain(_data.data.records.data)
    .filter({ expiryDate: expiryDate })
    .value();
  if (temp_data.length < 6)
    return _.chain(temp_data).sortBy("strikePrice").value();

  let a = _.chain(temp_data)
    .filter({ flag: false })
    .sortBy("strikePrice")
    .takeRight(8)
    .value();
  let b = _.chain(temp_data)
    .filter({ flag: true })
    .sortBy("strikePrice")
    .take(8)
    .value();
  return _.chain([...a, ...b])
    .sortBy("strikePrice")
    .value();
}
