'use strict';
const { request } = require('../../../utils/fetcher.js');
const { ScraperError } = require('../../../utils/errors.js');
async function fetchJson (url, options) {
    try {
        const opts = {
            requestOptions: {
                method: 'GET',
                body: JSON.stringify(options)
            },
            jsonType: true
        };
        return await request(url, opts);
    } catch (e) {
        throw e;
    }
}
//Youtube audio downloader
async function audiodl(url) {
    const content = await download('webm', url);
    if (!content)
        throw new Error('Audio não encontrado');
    return content;
}
exports.audiodl = audiodl;
//Youtube video downloader
async function videodl(url) {
    const content = await download('360', url);
    if (!content)
        throw new Error('Vídeo não encontrado');
    return content;
}
exports.videodl = videodl;
/**
 * Downloads a video or audio;
 * from a specified URL.
 * 
 * @param {String} type - media format or quality.
 * @param {String} url - The URL of the video.
 * 
 * @returns {String} - The direct download URL.
 */
async function download(type, url) {
    try {
        const data = await fetchJson(`https://ab.cococococ.com/ajax/download.php?format=${type}&url=${encodeURIComponent(url)}`, {
            cache: 'no-store',
        });
        if (!data.success)
            throw new Error('Download failed');
        let download = null;
        while (true) {
            const result = await progress(data.id);
            if (result.text === 'Video Unavailable') 
                break;
            if (result.progress >= 1000 && result.text === 'Finished') {
                if (result.download_url !== null && result.success !== 0) {
                    download = result.download_url;
                }

                break;
            }
        }
        return download;
    } catch (e) {
        throw new Error(`Falha ao processar o download\n${e}`);
    }
}
async function progress(id) {
    return await fetchJson(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
        cache: 'no-store',
    });
}
