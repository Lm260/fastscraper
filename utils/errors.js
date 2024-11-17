'use strict';
/**
 * The `ScraperError` class is a custom error class designed to provide more 
 * specific error handling for web scraping operations. This class extends the 
 * @param status - number
 * @param message - error
 */
class ScraperError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.ScraperError = ScraperError;
