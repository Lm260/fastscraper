'use strict';
const fastscraper = {
    ...require('../src/downloader-scraper/index.js'),
    ...require('../src/images-scraper/index.js'),
    ...require('../src/search-scraper/index.js')
};
module.exports = fastscraper;
