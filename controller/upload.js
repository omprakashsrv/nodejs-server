const {createSuccessResponse, createErrorResponse} = require('../utils/response_utils');
const {uploadPdf} = require('../digio/client.js');

exports.upload = async function (req, res, next) {
    try {
        let response = await uploadPdf(req.file);
        res.send(createSuccessResponse(response.body));
    } catch (e) {
        res.send(createErrorResponse(e.message));
    }
}