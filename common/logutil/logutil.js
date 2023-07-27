const log4js = require('log4js');
const path = require('path');
log4js.configure({
    appenders: {
        console: {type: 'console'},
        file: {
            type: 'file', filename: 'logs/app.log',
            layout: {type: 'basic'},
        },
    },
    categories: {
        default: {appenders: ['console', 'file'], level: 'info'}
    },
    layout: {
        type: 'pattern',
        pattern: '[%d] [%p] [%c] [%f{1}:%l] %m%n',
    },
});

function getLogger(string) {
    return log4js.getLogger(string);
}

const logger = log4js.getLogger();

module.exports = {
    info: function (message) {
        logger.info(message);
    },
    error: function (message) {
        logger.error(message);
    },
    warn: function (message) {
        logger.warn(message);
    },
    fatal: function (message) {
        logger.fatal(message);
    },
    GetLogger: getLogger
};
