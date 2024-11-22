'use strict';
const { request } = require('undici');
exports.request = async (url, options) => {
    const {
        requestOptions,
        jsonType
    } = options;
    const {
        statusCode,
        headers,
        body
    } = await request(url, requestOptions);
    const code = statusCode.toString();
    if (code.startsWith('2')) {
        if (jsonType) return body.json();
        return body.text();
    }
    if (code.startsWith('3')) return exports.request(headers.location, options);
    const err = new Error(`Falha na requisição code: ${code}`);
    err.statusCode = code;
    throw err;
};
