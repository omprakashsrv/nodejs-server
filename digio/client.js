const baseUrl = "https://ext.digio.in:444/";
let clientId = process.env.CLIENT_ID || 'AIZ67DUSNZ8TGWJV4DZ7DI3T5Z2LN2W2';
let clientSecret = process.env.CLIENT_SECRET || 'ASN9AVKHU6HF41KTU71G3KNXLG1ET7BC';
let authToken = Buffer.from(clientId + ":" + clientSecret).toString('base64')

const got = require('got');

exports.uploadPdf = async function (file) {
    return await got.post(baseUrl + 'v2/client/document/uploadpdf', {
        json: {
            "signers": [{
                "identifier": "omprakashsrv@gmail.com",
                "name": "OMPRAKASH",
                "reason": "Loan Agreement"
            }],
            "expire_in_days": 10,
            "display_on_page": "all",
            "file_name": "test.pdf",
            "file_data": file.buffer.toString('base64')
        },
        headers: {
            "Authorization": "Basic " + authToken
        },
        responseType: 'json'
    });
}

exports.downloadPdf = function (documentId) {
    return got.stream(baseUrl + 'v2/client/document/download', {
        searchParams: {document_id: documentId},
        headers: {
            "Authorization": "Basic " + authToken
        },
    });
}