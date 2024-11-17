'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { ScraperError } = require('../../../utils/errors.js');
const BASE_URL = 'https://www.lyricfinder.org';
/**
 * Lyrics search by music name
 * @param {String} query - music name
 * @returns {Promise<Object>} resultado da busca
 */
async function searchLyrics(query) {
    try {
        const data = await request(`${BASE_URL}/search?searchtype=lyrics&query=${encodeURIComponent(query)}`, {
            requestOptions: {
                method: 'GET',
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
                }
            },
            jsonType: false
        });
        const $ = load(data);
        const getFirstURL = $('div.col-md-6.col-sm-12 a')
            .map((_, e) => $(e).attr('href'))
            .get()[0];
        if (!getFirstURL) {
            return {
                status: false,
                message: 'No results found.'
            };
        }
        const URLsearch = `https:${getFirstURL}`;
        const body = await request(URLsearch, {
            requestOptions: {
                method: 'GET',
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
                }
            },
            jsonType: false
        });
        const $$ = load(body);
        const title = query;
        const artist = $$('div.col-lg-6 h3').text().trim();
        const lyrics = $$('div.col-lg-6').text().split(artist)[1].trim();
        return {
            title,
            artist,
            lyrics
        };
    } catch (e) {
        throw new ScraperError(false, `Failed to fetch lyrics:\n${e}`);
    }
}
exports.searchLyrics = searchLyrics;
