const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await xhentai();
    return res.json({ status: 200, creator: 'OwnBlox', results });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

function xhentai() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 1153);
    axios
      .get('https://sfmcompile.club/page/' + page)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const hasil = [];
        $('#primary > div > div > ul > li > article').each((a, b) => {
          hasil.push({
            title: $(b).find('header > h2').text(),
            link: $(b).find('header > h2 > a').attr('href'),
            category: $(b)
              .find('header > div.entry-before-title > span > span')
              .text()
              .replace('in ', ''),
            share_count: $(b).find('.share-count').text(),
          });
        });
        resolve(hasil);
      })
      .catch((err) => reject(err));
  });
}

module.exports = router;
