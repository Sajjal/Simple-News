const express = require("express");
const router = express.Router();
const { allEnglish, allNepali } = require("../getNews/allNewsTitle");

router.get("/", async (req, res) => {
  let englishNews = await allEnglish();
  let nepaliNews = await allNepali();
  //res.json({ English: { englishNews }, Nepali: { nepaliNews } });
  res.render("title", { English: { englishNews }, Nepali: { nepaliNews } });
});

module.exports = router;
