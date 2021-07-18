const Sequelize = require('sequelize');
const path = require('path');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('transaction');
const moment = require('moment');
const {isEmpty} = require("../utils/data_validator");

let databaseName = process.env.DATABASE || "recibofp";
let dbUsername = process.env.DB_USERNAME || "root";
let dbPassword = process.env.DB_PASSWORD || "root";
let dbHost = process.env.DB_HOST || "127.0.0.1";
let dbLogging = process.env.QUERY_LOGGING === 'true';

const sequelize = new Sequelize(databaseName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: dbLogging === 'true',
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                let fieldString = field.string();
                if (isEmpty(fieldString)) return null;
                return moment(fieldString).format("YYYY-MM-DD HH:mm:ss.SSSSSS");
            }
            return next()
        },
    },
    timezone: '+05:30',
    pool: {
        max: 20,
        min: 0,
        idle: 10000,
        acquire: 30000,
        evict: 1000,
    }
});

Sequelize.useCLS(namespace);
const database = {};

const User = require(path.join(__dirname, '/model/user'))(sequelize, Sequelize.DataTypes)
database.User = User;

database.namespace = namespace;
Object.keys(database).forEach((modelName) => {
    if ('associate' in database[modelName]) {
        database[modelName].associate(database);
    }
});

database.sync = async function (callback) {
    try {
        await sequelize.sync();
        callback();
    } catch (e) {
        console.log(e);
    }
};

module.exports = database;