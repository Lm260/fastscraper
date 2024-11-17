'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { stringify } = require('qs');
const { ScraperError } = require('../../../utils/errors.js');
const DEFAULT_BASE_URL = 'https://ssstik.io/abc?url=dl';
const DEFAULT_HEADERS = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie': '__cfduid=deb9cec7a40793d1abe009bb9961a92d41617497572; PHPSESSID=7ivsp9hc6askg1qocpi8lfpn7n; __cflb=02DiuEcwseaiqqyPC5q2cQqNGembhyZ5QaychuqFzev83; _ga=GA1.2.131585469.1617497575; _gid=GA1.2.1629908100.1617497575; _gat_UA-3524196-6=1',
    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
};
/**
 * Tiktok video downloader
 * Scrape from https://ssstik.io/
 */
async function tiktok(url) {
    try {
        const config = {
            id: url,
            locale: 'en',
            tt: 'OGZEU2hj'
        };
        const payload = {
            requestOptions: {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: stringify(config)
            },
            jsonType: false
        };
        const data = await request(DEFAULT_BASE_URL, payload);
        const $ = load(data);
        const video = $('#dl_btns a').eq(0).attr('href');
        const audio = $('#dl_btns a').eq(3).attr('href');
        return {
            url,
            result: {
                video,
                audio
            }
        }
    } catch (e) {
        throw new ScraperError(false, e.message);
    }
}
exports.tiktok = tiktok;
