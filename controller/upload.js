const {createSuccessResponse, createErrorResponse} = require('../utils/response_utils');
const got = require('got');

exports.uploadFile = async function (req, res, next) {
    let clientId = process.env.CLIENT_ID || 'AIZ67DUSNZ8TGWJV4DZ7DI3T5Z2LN2W2';
    let clientSecret = process.env.CLIENT_SECRET || 'ASN9AVKHU6HF41KTU71G3KNXLG1ET7BC';
    let authToken = Buffer.from(clientId + ":" + clientSecret).toString('base64')
    let response = await got.post('https://ext.digio.in:444/v2/client/document/uploadpdf', {
        json: {
            "signers": [{
                "identifier": "omprakashsrv@gmail.com",
                "name": "OMPRAKASH",
                "reason": "Loan Agreement"
            }],
            "expire_in_days": 10,
            "display_on_page": "all",
            "file_name": "test.pdf",
            "file_data": req.file.buffer.toString('base64')
        },
        headers: {
            "Authorization": "Basic " + authToken,
            "Content-Type": "application/json"
        },
        responseType: 'json'
    });
    res.send(createSuccessResponse(response.body));
}