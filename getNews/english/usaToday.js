const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://usatoday.com";

//Get Title and URL
function usaToday() {
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
        if (title.length > 5)
          data.push({ source: "USA Today", news: { title, link: url + link } });
      });
      return data;
    });
}

//Get the full News
function usaTodayFull(newsUrl) {
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

module.exports = { usaToday, usaTodayFull };
