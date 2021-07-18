const got = require('got');

sendRequest();

async function sendRequest() {
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
            "file_data": "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UiAvUHJvZHVjZXIgMTYgMCBSIC9DcmVhdG9yIDE3IDAgUiAvQ3JlYXRpb25EYXRlIDE4IDAgUiAvTW9kRGF0ZQoxOCAwIFIgL0tleXdvcmRzIDE5IDAgUiAvQUFQTDpLZXl3b3JkcyAyMCAwIFIgPj4KZW5kb2JqCnhyZWYKMCAyMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDYyNzcgMDAwMDAgbiAKMDAwMDAwMDI0OSAwMDAwMCBuIAowMDAwMDAxNzMwIDAwMDAwIG4gCjAwMDAwMDAwMjIgMDAwMDAgbiAKMDAwMDAwMDIzMCAwMDAwMCBuIAowMDAwMDAwMzU4IDAwMDAwIG4gCjAwMDAwMDE2OTUgMDAwMDAgbiAKMDAwMDAwMTg2OCAwMDAwMCBuIAowMDAwMDAwNDU1IDAwMDAwIG4gCjAwMDAwMDE2NzQgMDAwMDAgbiAKMDAwMDAwMTgxOCAwMDAwMCBuIAowMDAwMDAyMjM1IDAwMDAwIG4gCjAwMDAwMDI0ODcgMDAwMDAgbiAKMDAwMDAwNjA3MiAwMDAwMCBuIAowMDAwMDA2MDkzIDAwMDAwIG4gCjAwMDAwMDYxMTYgMDAwMDAgbiAKMDAwMDAwNjE2OSAwMDAwMCBuIAowMDAwMDA2MTk2IDAwMDAwIG4gCjAwMDAwMDYyMzggMDAwMDAgbiAKMDAwMDAwNjI1NyAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDIxIC9Sb290IDExIDAgUiAvSW5mbyAxIDAgUiAvSUQgWyA8YjRjZWI4YjBhZGEyZmVkOTQ1NTg5M2UwZDJmNTVkMjY+CjxiNGNlYjhiMGFkYTJmZWQ5NDU1ODkzZTBkMmY1NWQyNj4gXSA+PgpzdGFydHhyZWYKNjQyMQolJUVPRgo="
        },
        headers: {
            "Authorization": "Basic QUlaNjdEVVNOWjhUR1dKVjREWjdESTNUNVoyTE4yVzI6QVNOOUFWS0hVNkhGNDFLVFU3MUczS05YTEcxRVQ3QkM=",
            "Content-Type": "application/json"
        },
        responseType: 'json'
    });
    console.log(response);
}