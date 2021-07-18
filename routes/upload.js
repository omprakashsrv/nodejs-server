const express = require('express');
const router = express.Router();
const uploadController = require('../controller/upload');

router.post('/', function (req, res, next) {
    uploadController.upload(req, res, next);
});

module.exports = router;
