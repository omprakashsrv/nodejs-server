const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const uuid = require('uuid');
const logger = require("./utils/logger")('server');
const error = require("./middlewares/error");

const usersRouter = require('./routes/users');

let app = express();

function assignId(req, res, next) {
    req.id = uuid.v4();
    req.requestTime = new Date();
    req.headers['uuid'] = req.id;
    next();
}

app.use(cors());
app.use(helmet())
app.use(assignId);
logger.stream(app);
logger.debug("Overriding Express logger");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
