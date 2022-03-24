const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://www.onlinekhabar.com/wp-json/okapi/v1/trending-posts?limit=9";

//Get Title and URL
function onlineKhabar() {
    let data = [];
    return fetch(`${url}`)
        .then((response) => response.text())
        .then((body) => {
            body = JSON.parse(body)
            body = body.data.news
            for (let i = 0; i < body.length; i++) {
                if (data.length < 8 && body[i].title.length > 5)
                    data.push({ source: "OnlineKhabar", news: { title: body[i].title, link: body[i].link } });
            }
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