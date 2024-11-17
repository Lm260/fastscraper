'use strict';
const fastscraper = require('../lib/index.js');

fastscraper.instagram('https://www.instagram.com/reel/C7oiaOTOMGY/')
    .then(console.log)
    .catch(console.error);
    