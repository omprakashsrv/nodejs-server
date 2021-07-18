exports.isEmpty = function isEmpty(value) {
    return value === undefined || value === null || value === '';
};

exports.isEmptyArray = function isEmpty(value) {
    return value === undefined || value === null || value.length === 0;
};

exports.isEmptyObject = function (obj) {
    if (obj === undefined || obj === null) {
        return true;
    }
    return Object.keys(obj).length === 0;
};

