const validator = require('./data_validator');
const moment = require('moment');

exports.formatDate = function formatDate(date, formatString) {
    return validator.isEmpty(date) ? '' : moment(date).format(formatString)
};

exports.startOfDay = function formatDate(date) {
    return moment(date).startOf('day').toDate()
};

exports.startOfMonth = function formatDate(date) {
    return moment(date).startOf('month').toDate()
};

exports.previousStartOfMonth = function formatDate(date) {
    return moment(date).subtract(1, 'month').startOf('month').toDate()
};

exports.startOfWeek = function formatDate(date) {
    return moment(date).subtract(1, 'weeks').startOf('week').toDate()
};

exports.endOfDay = function formatDate(date) {
    return moment(date).endOf('day').toDate()
};

exports.previousMonthCurrentDayEndOfDay = function formatDate(date) {
    return moment(date).subtract(1, 'month').endOf('day').toDate()
};

exports.endOfMonth = function formatDate(date) {
    return moment(date).endOf('month').toDate()
};

exports.endOfWeek = function formatDate(date) {
    return moment(date).subtract(1, 'weeks').endOf('week').toDate()
};

exports.formatTime = function formatTime(date) {
    return moment(date).format('h:mm A');
};

exports.currentTime = function (context) {
    let utcOffset = context.headers['utc-offset'];
    return moment().utcOffset(new Date().getTimezoneOffset() + parseInt(utcOffset));
};

exports.daysDiff = function (start, end) {
    return end.diff(start, "days");
};
