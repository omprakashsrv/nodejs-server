const database = require('../db/database');
const {createSuccessResponse, createErrorResponse} = require('../utils/response_utils');

exports.getAllUsers = async function (req, res, next) {
    Promise.resolve().then(async function () {
        let users = await database.User.findAll({where: {}});
        res.send(createSuccessResponse(users));
    }).catch(next);
}