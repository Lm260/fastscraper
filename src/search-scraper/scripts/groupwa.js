'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { ScraperError } = require('../../../utils/errors.js');
/**
 * Group Search
 * Scraper from https://whatsgrouplink.com
 * @param {String} name - Nome da busca
 * @return {Object} resultados 
 */
async function groupWA(name) {
    try {
        const html = await request(`https://whatsgrouplink.com/?s=${name}`, {
            requestOptions: {
                method: 'GET',
            },
            jsonType: false
        });
        const $ = load(html);
        const URL_1 = $('.entry-title-link').first().attr('href');
        if (!URL_1)
            throw new ScraperError(false, 'No found');
        const body = await request(URL_1, {
            requestOptions: {
                method: 'GET',
            },
            jsonType: false
        });
        const $$ = load(body);
        const grupos = [];
        $$('ul li').each((_, el) => {
            const link = $$(el).find('a').attr('href');
            if (link && link.includes('chat.whatsapp.com')) {
                const nome = $$(el).clone().children().remove().end().text().trim();
                grupos.push({
                    nome,
                    link
                });
            }
        });
        return {
            query: name,
            result: grupos
        };
    } catch (e) {
        throw new ScraperError(false, `Falha ao obter resultados:\n${e.message}`);
    }
}
exports.groupWA = groupWA;
