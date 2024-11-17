'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { stringify } = require('qs');
const { ScraperError } = require('../../../utils/errors.js');
const BASE_URL = 'https://vidinsta.app';
const HEADERS = {
    'user-agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'connection': 'keep-alive',
    'origin': 'https://vidinsta.app',
    'referer': 'https://vidinsta.app/',
    'x-csrf-token': 'IrIYkEXAyfiUcEZgQuW9jVVIwJkandxVddfZcPulCOZB4nDGNvCejPYGCiQovdPSbCDt9SypjWY555UEge06kQ==',
    'x-requested-with': 'XMLHttpRequest',
    'cookie': '_csrf=608d48854ec29384d72c245d07f0b104cab4642bc2a6639def2a78956fd2784ea%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22cPhVs0WtbvLDjXn_9h-l64Q3L0LtzH2w%22%3B%7D;'
};
/**
 * Scraper from https://vidinsta.app
 */
async function instagram(url) {
    try {
        const params = {
            requestOptions: {
                method: 'POST',
                headers: HEADERS,
                body: stringify({
                    url: url
                })
            },
            jsonType: false
        };
        const data = await request(BASE_URL + '/web/home/fetch', params);
        if (!data)
            throw new ScraperError(false, 'Data not found');
        const $ = load(data);
        const result = [];
        $('div.row').each(function() {
            if ($(this).find('.item-download > div > a').attr('href')) {
                result.push({
                    link: BASE_URL + $(this).find('.item-download > div > a').attr('href')
                });
            }
        });
        return {
            url,
            result
        };
    } catch (e) {
        throw new ScraperError(false, `Falha ao baixar vídeo do Instagram:\n${e}`);
    }
}
exports.instagram = instagram;
