const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://www.khasokhas.com/";

//Get Title and URL
function khasokhas() {
    let data = [];
    return fetch(`${url}`)
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);
            $(".custom-list-item a").each(function(i, element) {
                const $element = $(element);
                let title = $element.text();
                let link = $element.attr("href");
                title = title.replace(/\s+/g, " ").trim();
                if (title.length > 5)
                    data.push({ source: "Khasokhas", news: { title, link: link } });
            });
            return data;
        });
}

//Get the full News
function khasokhasFull(newsUrl) {
    let data = [];
    return fetch(`${newsUrl}`)
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);
            //getting the news
            $(".post-entry p").each(function(i, element) {
                const $element = $(element);
                let news = $element.text();
                news = news.replace(/\s+/g, " ").trim();
                data.push(news);
            });
            return data;
        });
}
module.exports = { khasokhas, khasokhasFull };