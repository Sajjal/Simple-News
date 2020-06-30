const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://www.clarionledger.com";

//Get Title and URL
function clarionledgerNews() {
  let data = [];
  return fetch(`${url}`)
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body);
      $(".gnt_m_th a").each(function (i, element) {
        const $element = $(element);
        let title = $element.text();
        let link = $element.attr("href");
        title = title.replace(/\s+/g, " ").trim();

        data.push({
          source: "Clarion Ledger",
          news: { title, link: url + link },
        });
      });
      return data;
    });
}

//Get The full News
function clarionLedgerFull(newsUrl) {
  let data = [];
  return fetch(`${newsUrl}`)
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body);
      //getting the news
      $(".gnt_ar_b p").each(function (i, element) {
        const $element = $(element);
        let news = $element.text();
        news = news.replace(/\s+/g, " ").trim();
        data.push(news);
      });
      return data;
    });
}
module.exports = { clarionledgerNews, clarionLedgerFull };
