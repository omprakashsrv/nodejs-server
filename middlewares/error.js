const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const apiError = require('./api_error');

/**
 * Error handler. Send stacktrace only during development
 * @common
 */
const handler = (err, req, res, next) => {
    const errorResponse = {
        status: "error",
        code: err.code,
        name: err.name,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
    };
    res.status(err.status);
    let error = {};
    error.errors = [];
    error.code = err.code;
    error.errors.push(errorResponse);
    res.send(error);
    res.end();
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @common
 */
exports.converter = (err, req, res, next) => {
    let convertedError = err;

    if (err instanceof expressValidation.ValidationError) {
        const errors = err.errors.map(e => ({
            location: e.location,
            messages: e.messages,
            field: e.field[0],
        }));
        convertedError = new apiError({
            message: 'Validation Error',
            errors,
            status: err.status,
            stack: err.stack,
        });
    } else if (!(err instanceof apiError)) {
        convertedError = new apiError({
            message: err.message,
            status: err.status,
            stack: err.stack,
            errors: err.errors
        });
        convertedError.code = err.code;
        convertedError.name = err.name;
    }
    return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @common
 */
exports.notFound = (req, res, next) => {
    const err = new apiError({
        message: 'Not found',
        code: 404,
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};

// /**
//  * Catch 429 ratelimit exceeded
//  * @common
//  */
// exports.rateLimitHandler = (req, res, next) => {
//     const err = new APIError({
//         message: 'Rate limt exceeded, please try again later some time.',
//         status: httpStatus.TOO_MANY_REQUESTS,
//     });
//     return handler(err, req, res);
// };
