const {createSuccessResponse, createErrorResponse} = require('../utils/response_utils');
const {uploadPdf} = require('../digio/client.js');
const logger = require('../utils/logger')('upload');

exports.upload = async function (req, res, next) {
    try {
        let response = await uploadPdf(req.file, req.query.name, req.query.identifier, req.query.reason);
        res.send(createSuccessResponse(response.body));
    } catch (e) {
        res.send(createErrorResponse(e.message));
        logger.error(req.id, "upload error", e, e.message);
    }
}