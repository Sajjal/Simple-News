const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://www.onlineKhabar.com/";

//Get Title and URL
function onlineKhabar() {
  let data = [];
  return fetch(`${url}`)
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body);
      $(".most_recomenede_side a")
        .slice(0, 13)
        .each(function (i, element) {
          const $element = $(element);
          let title = $element.text();
          let link = $element.attr("href");
          title = title.replace(/\s+/g, " ").trim();
          if (title.length > 5)
            data.push({ source: "OnlineKhabar", news: { title, link: link } });
        });
      return data;
    });
}

//Get the full News
function onlineKhabarFull(newsUrl) {
  let data = [];
  return fetch(`${newsUrl}`)
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body);
      //getting the news
      $(
        ".col.colspan3.main__read--content.ok18-single-post-content-wrap p"
      ).each(function (i, element) {
        const $element = $(element);
        let news = $element.text();
        news = news.replace(/\s+/g, " ").trim();
        data.push(news);
      });
      return data;
    });
}

module.exports = { onlineKhabar, onlineKhabarFull };
