const {createSuccessResponse, createErrorResponse} = require('../utils/response_utils');
const {downloadPdf} = require('../digio/client');
const logger = require('../utils/logger')('download');

exports.download = async function (req, res, next) {
    try {
        downloadPdf(req.query.document_id).pipe(res);
    } catch (e) {
        res.send(createErrorResponse(e.message));
        logger.error(req.id, "download error", e, e.message);
    }
}