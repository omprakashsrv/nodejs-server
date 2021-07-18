const express = require('express');
const router = express.Router();
const downloadController = require('../controller/download');

router.get('/', function (req, res, next) {
    downloadController.download(req, res, next);
});

module.exports = router;
