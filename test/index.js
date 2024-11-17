'use strict';
const fastscraper = require('../lib/index.js');
(async () => {
    const tasks = [
        {
            description: 'Google Image Search',
            action: async () => await fastscraper.googleimage('Hutao')
        },
        {
            description: 'Tiktok Video Downloader',
            action: async () => await fastscraper.tiktok('https://vm.tiktok.com/ZMhtfdnEr/')
        },
        {
            description: 'YouTube Video Search',
            action: async () => await fastscraper.youtubeVideoSearch('Hutao Genshin Impact')
        }
    ];
    for (const task of tasks) {
        console.time('Tempo:');
        try {
            const result = await task.action();
            console.log(task.description, 'Sucesso!');
        } catch (e) {
            console.error(task.description, `Falhou: ${e.message}:`);
        }
        console.timeEnd('Tempo:');
    }
})();
