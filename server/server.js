const axios = require("axios");
let cookieExpiry = new Date().getTime() + 60 * 1000;
let cookies = "";
let cookieUsedCount = 0;
module.exports = {
  nseindia: "https://www.nseindia.com/",
  moneycontrol: "https://www.moneycontrol.com/",
  getNseCookies: async function () {
    if (
      cookieExpiry <= new Date().getTime() ||
      cookies == "" ||
      cookieUsedCount > 10
    ) {
      const response = await axios.get(this.nseindia, {
        headers: {
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      });
      cookies = response.headers["set-cookie"].join(";");
      cookieUsedCount = 0;
      cookieExpiry = new Date().getTime() + 60 * 1000;
    }
    return cookies;
  },
  get_all_nse: async function (_url) {
    cookieUsedCount++;
    try {
      const response = await axios.get(this.nseindia + _url, {
        headers: {
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          Cookie: await this.getNseCookies(),
        },
      });
      return response.data;
    } catch (err) {
      cookieUsedCount--;
      throw err;
    }
  },
  getRaw: async function (url, cookie) {
    try {
      const response = await axios.get(this.moneycontrol + url, {
        headers: {
          Cookie: cookie,
        },
      });
      cookieUsedCount = 0;
      return response.data;
    } catch (error) {
      throw "eerroooorr";
    }
  },
};
