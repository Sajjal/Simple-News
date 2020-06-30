const { clarionledgerNews } = require("./english/clarionLedger");
const { usaToday } = require("./english/usaToday");

const { khasokhas } = require("./nepali/khasokhas");
const { onlineKhabar } = require("./nepali/onlineKhabar");

async function allEnglish() {
  let clarionLedger = await clarionledgerNews();
  let usa = await usaToday();
  let allEnglishNews = clarionLedger.concat(usa);
  return allEnglishNews;
}

async function allNepali() {
  let khasokhasNews = await khasokhas();
  let okNews = await onlineKhabar();
  let allNepaliNews = khasokhasNews.concat(okNews);
  return allNepaliNews;
}

module.exports = { allEnglish, allNepali };
