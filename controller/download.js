const {createSuccessResponse, createErrorResponse} = require('../utils/response_utils');
const {downloadPdf} = require('../digio/client');

exports.download = async function (req, res, next) {
    try {
        downloadPdf(req.query.document_id).pipe(res);
    } catch (e) {
        res.send(createErrorResponse(e.message));
    }
}