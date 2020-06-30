const express = require("express");
const router = express.Router();

const { clarionLedgerFull } = require("../getNews/english/clarionLedger");
const { usaTodayFull } = require("../getNews/english/usaToday");
const { khasokhasFull } = require("../getNews/nepali/khasokhas");
const { onlineKhabarFull } = require("../getNews/nepali/onlineKhabar");

router.get("/", async (req, res) => {
  let data = {
    title: req.query.title,
    source: req.query.source,
    link: req.query.link,
  };

  async function getFullNews() {
    if (data.source === "Clarion Ledger")
      return await clarionLedgerFull(data.link);
    else if (data.source === "USA Today") return await usaTodayFull(data.link);
    else if (data.source === "Khasokhas") return await khasokhasFull(data.link);
    else if (data.source === "OnlineKhabar")
      return await onlineKhabarFull(data.link);
  }
  let fullNews = await getFullNews();
  res.render("news", { title: data.title, news: fullNews, link: data.link });
});
module.exports = router;
