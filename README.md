# FastScraper
Fast web scraper for nodeJS.

Um simples Web Scraper para seus projetos NodeJS com suporte para CommonJS. 

### Instalação

**Clonar repositório**

```sh
git clone https://github.com/Lm260/fastscraper
```
> Ou baixe o arquivo em formato ZIP. [Baixar](https://github.com/Lm260/fastscraper/archive/refs/heads/main.zip)
------------------

Instalar dependências

```sh
npm i
```

Modo teste

```sh
npm test
```

### Exemplo de uso

**Importando o módulo**

```js
const fastscraper = require('fastscraper');
```

### Executando funções

- Google Image Search

```js
//commonjs
const googleimg = await fastscraper.googleimage('Hutao');

//output
console.log(googleimg); //Array<images>
```

- Tiktok Video Downloader

```js
//commonjs
const tiktokdl = await fastscraper.tiktok('https://vm.tiktok.com/ZMhtfdnEr/');

//output
console.log(tiktokdl); //Object<Audio e Video>
```

- YouTube Video Search 
> Somente Videos

```js
//commonjs
const ytsv = await fastscraper.youtubeVideoSearch('Hutao Genshin impact');

//output
console.log(ytsv); //Object > Array<results>
```

### Características

- **Uso:** Simples, leve é fácil de usar;
- **Dependências:** Poucas dependências instaladas;
- **Desempenho** Rápido em requisições e processamento de dados;
- **Suporte** Para qualquer problema ou sugestão, entre em contato. [Whatsapp](https://chat.whatsapp.com/CMcAAljSWZhHWyssMJFCp8)

### Dependências

| Modulo          | Versão
| :----------------- | :------------------------- | 
| cheerio            | 1.0.0
| qs               | 6.13.0
| undici            | 6.21.0

## Outros
* [__`Downloaders`__](./src/downloader-scraper/scripts)
* [__`Images`__](./src/images-scraper/scripts)
* [__`Search`__](./src/search-scraper/scripts)

- Mais em breve...

## Contributors
* [__Canal__](https://whatsapp.com/channel/0029ValLKgUAO7RCUU0dO03k)
* [__NKzin__](https://github.com/NKzin)
* [__Suporte__](https://chat.whatsapp.com/CMcAAljSWZhHWyssMJFCp8)

## License

Licensed under [MIT](./LICENSE).
Todos os direitos reservados.
