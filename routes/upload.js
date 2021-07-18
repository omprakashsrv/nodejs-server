const express = require('express');
const router = express.Router();
const uploadController = require('../controller/upload');

router.post('/', async function (req, res, next) {
    uploadController.uploadFile(req, res, next);
});

module.exports = router;
