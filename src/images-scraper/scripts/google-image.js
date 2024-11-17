'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { ScraperError } = require('../../../utils/errors.js');
const GOOGLE_URL = 'https://www.google.com';
//Google image search
async function googleimage(query) {
    try {
        const params = {
            requestOptions: {
                method: 'GET',
            },
            jsonType: false
        };
        const data = await request(`${GOOGLE_URL}/search?q=${query}&tbm=isch`, params);
        const html = load(data);
        const result = html('div.kCmkOe').map(function() {
            return html(this).find('img').attr('src');
        }).get();
        return {
            query,
            result
        };
    } catch (e) {
        throw new ScraperError(false, `Falha ao buscar imagem:\n${e}`);
    }
}
exports.googleimage = googleimage;
