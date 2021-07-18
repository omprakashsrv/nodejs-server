const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
const logDir = 'logFile';
const path = require('path');
let validator = require('./data_validator')
let dateUtils = require('./date_utils')

const morgan = require('morgan');
morgan.token('id', function getId(req) {
    return req.id
});

const logLevel = process.env.LOG_LEVEL || "info";

const logger = winston.createLogger({
    transports: [
        new (winston.transports.DailyRotateFile)({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: false,
            filename: `${logDir}/results_log_%DATE%log`,
            datePattern: 'YYYY-MM-DD.',
            timestamp: function () {
                return moment().format('DDD MMM YYYY hh:mm:ss')
            },
            prepend: true,
            level: logLevel
        }),
        new winston.transports.Console({
            level: logLevel,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            datePattern: 'YYYY-MM-DD.',
            timestamp: function () {
                return moment().format('DDD MMM YYYY hh:mm:ss')
            },
            localTime: true,
            colorize: true
        }),
        new (winston.transports.DailyRotateFile)({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: false,
            filename: `${logDir}/err_log_%DATE%log`,
            datePattern: 'YYYY-MM-DD.',
            timestamp: function () {
                return moment().format('DDD MMM YYYY hh:mm:ss')
            },
            prepend: true,
            level: 'error'
        }),
        new (winston.transports.DailyRotateFile)({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: false,
            filename: `${logDir}/warn_log_%DATE%log`,
            datePattern: 'YYYY-MM-DD.',
            timestamp: function () {
                return moment().format('DDD MMM YYYY hh:mm:ss')
            },
            prepend: true,
            level: 'warn'
        })
    ],
    exitOnError: false
});
logger.emitErrs = true;

// module.exports = logger;

// Rotate every day or every 5 megabytes, whatever comes first.
var rotatingLogStream = require('file-stream-rotator').getStream(
    {
        filename: path.join(logDir, 'access_%DATE%.log'),
        verbose: false,
        date_format: "YYYY-MM-DD",
        frequency: 'daily',
    }
);
rotatingLogStream.on('rotate', function (oldFile, newFile) {
    // do something with old file like compression or delete older than X days.
});

module.exports = function (fileName) {
    const myLogger = {
        //Construct String builder remove undefined
        error: function (requestID, message, data, error) {
            logger.error(formatString(fileName, requestID, message, data, error));
        },
        info: function (requestID, message, data) {
            logger.info(formatString(fileName, requestID, message, data))
        },
        warn: function (requestID, message, data) {
            logger.warn(formatString(fileName, requestID, message, data))
        },
        debug: function (requestID, message, data) {
            logger.debug(formatString(fileName, requestID, message, data))
        },
        verbose: function (requestID, message, data) {
            logger.verbose(formatString(fileName, requestID, message, data))
        },
        silly: function (requestID, message, data) {
            logger.silly(formatString(fileName, requestID, message, data))
        },
        stream: function (server) {
            server.use(morgan(':id :response-time :remote-addr - :remote-user [:date] "' +
                ':method :url HTTP/:http-version" :status ' +
                ':res[content-length] ":referrer" ":user-agent"'
                , {stream: rotatingLogStream}));
        },
    };

    return myLogger;
};

function formatString(fileName, requestID, message, data, error) {
    let messageToLog = dateUtils.formatDate(new Date(), 'DD-MM-YYYY hh:mm:ss');

    if (!validator.isEmpty(requestID)) {
        messageToLog += (" " + requestID);
    }
    if (!validator.isEmpty(message)) {
        messageToLog += (" " + message);
    }

    if (!validator.isEmpty(data)) {
        messageToLog += (" " + data);
    }

    if (!validator.isEmpty(error)) {
        messageToLog += (" Error: " + error);
    }
    return messageToLog;
}

