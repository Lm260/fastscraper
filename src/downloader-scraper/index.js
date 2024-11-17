'use strict';
const downloaders = {};
downloaders.tiktok = require('./scripts/tiktok.js').tiktok;
downloaders.instagram = require('./scripts/instagram.js').instagram;
downloaders.yt = require('./scripts/youtube.js');
module.exports = downloaders;
