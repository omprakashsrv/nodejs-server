const got = require('got');

const baseUrl = "https://ext.digio.in:444/";
let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
let authToken = Buffer.from(clientId + ":" + clientSecret).toString('base64')
let headers = {
    "Authorization": "Basic " + authToken
};

exports.uploadPdf = async function (file, name, identifier, reason) {
    return await got.post(baseUrl + 'v2/client/document/uploadpdf', {
        json: {
            "signers": [{
                "identifier": identifier || "omprakashsrv@gmail.com",
                "name": name || "OMPRAKASH",
                "reason": reason || "Loan Agreement"
            }],
            "expire_in_days": 10,
            "display_on_page": "all",
            "file_name": "test.pdf",
            "file_data": file.buffer.toString('base64')
        },
        headers: headers,
        responseType: 'json'
    });
}

exports.downloadPdf = function (documentId) {
    return got.stream(baseUrl + 'v2/client/document/download', {
        searchParams: {document_id: documentId},
        headers: headers
    });
}