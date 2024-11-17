'use strict';
const { load } = require('cheerio');
const { request } = require('../../../utils/fetcher.js');
const { ScraperError } = require('../../../utils/errors.js');
const BASE_URL = 'https://pt.m.wikipedia.org';
/**
 * scrape from wikipedia
 */
async function wikipedia (query) {
    try {
        const data = await request(`${BASE_URL}/w/index.php?title=Especial:Pesquisar&fulltext=1&ns0=1&profile=advanced&search=${query}`, {
            requestOptions: {
                method: 'GET',
            },
            jsonType: false
        });
        const $ = load(data);
        const URLsearch = $('.mw-search-result-heading').map(function () {
            return $(this).find('a').attr('href');
        })[0];
        const body = await request(BASE_URL + URLsearch, {
            requestOptions: {
                method: 'GET',
            },
            jsonType: false
        });
        const $$ = load(body);
        let contents = '';
        $$('p').each(function() {
            contents += $$(this).text().trim() + '\n-\n';
        });
        return {
            title: query,
            image: 'https:' + ($$('a.mw-file-description').find('img').attr('src') || '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'),
            url: BASE_URL + URLsearch,
            result: contents
        };
    } catch (e) {
        throw new ScraperError(false, `Ocorreu um erro ao buscar por: ${query}`);
    }
}
exports.wikipedia = wikipedia;
