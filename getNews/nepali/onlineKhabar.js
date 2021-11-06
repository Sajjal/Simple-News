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
            $(".ok-news-post.ok-post-rtl a")
                .slice(0, 8)
                .each(function(i, element) {
                    const $element = $(element);
                    let title = $element.text();
                    let link = $element.attr("href");
                    title = title.replace(/\s+/g, " ").trim().split(' ').slice(1).join(' ');
                    if (title.length > 5)
                        data.push({ source: "OnlineKhabar", news: { title, link: link } });
                });
            return data;
        });
}

//Get the full News
function onlineKhabarFull(newsUrl) {
    console.log(newsUrl);
    let data = [];
    return fetch(`${newsUrl}`)
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);
            //getting the news
            $(
                ".ok18-single-post-content-wrap p"
            ).each(function(i, element) {
                const $element = $(element);
                let news = $element.text();
                news = news.replace(/\s+/g, " ").trim();
                data.push(news);
            });
            return data;
        });
}

module.exports = { onlineKhabar, onlineKhabarFull };