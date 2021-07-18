exports.createSuccessResponse = function createResponse(data, message) {
    let response = {};
    response.status = "success";
    response.data = data;
    response.message = message;
    response.code = 200;
    return response;
};

exports.createErrorResponse = function createResponse(message) {
    let response = {};
    response.status = 401;
    response.message = message;
    response.code = 401;
    return response;
};