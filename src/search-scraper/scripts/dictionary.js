'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { ScraperError } = require('../../../utils/errors.js');
const DEFAULT_BASE_URL = 'https://www.dicio.com.br';
/**
 * Fetches dictionary data for a given query.
 * @param {string} query - The search term to look up in the dictionary.
 * @returns {Promise<Object>} The result object containing status, creator, image URL, and the extracted text.
 */
async function dictionary(query) {
    try {
        const BASE_URL = `${DEFAULT_BASE_URL}/${encodeURIComponent(query)}/`;
        const data = await request(BASE_URL, {
            requestOptions: {
                method: 'GET',
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
                }
            },
            jsonType: false
        });
        const $ = load(data);
        const result= $('p').first().text().trim();
        return {
            query,
            result
        };
    } catch (error) {
        throw new ScraperError(false, `Failed to fetch dictionary data: ${error.message}`);
    }
}
exports.dictionary = dictionary;
