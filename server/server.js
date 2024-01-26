const axios = require("axios");

let cookies = "";

module.exports = {
  nseindia: "https://www.nseindia.com/",
  moneycontrol: "https://www.moneycontrol.com/",
  getNseCookies: async function () {
    const response = await axios.get(this.nseindia, {
      headers: {
        authority: "www.nseindia.com",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,mr;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
    });
    cookies = response.headers["set-cookie"].join(";");
    console.log(cookies);
    return cookies;
  },
  get_all_nse: async function (_url) {
    try {
      const response = await axios.get(this.nseindia + _url, {
        headers: {
          authority: "www.nseindia.com",
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,mr;q=0.8",
          "cache-control": "no-cache",
          pragma: "no-cache",
          referer:
            "https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY500%20MULTICAP%2050%3A25%3A25",

          "sec-ch-ua-mobile": "?0",

          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          Cookie: await this.getNseCookies(),
        },
      });
      return response.data;
    } catch (err) {
      //cookieUsedCount--;
      return {};
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
