const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    userController.getAllUsers(req, res, next);
});

module.exports = router;
