module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('user', {
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field: 'uid'
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'firstName'
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'lastName'
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            field: 'userName'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'password'
        },
        deviceId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'deviceId'
        },
        traderAppAccess: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            field: 'traderAppAccess',
            defaultValue: 0
        },
        countryCode: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '91',
            field: 'countryCode'
        },
        phone: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'phone'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'email'
        },
        verified: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            field: 'verified'
        },
        admin: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            field: 'admin'
        },
        active: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            field: 'active'
        },
        createdAt: {
            type: DataTypes.DATE(6),
            allowNull: true,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE(6),
            allowNull: true,
            field: 'updatedAt'
        }
    }, {
        tableName: 'user',
        indexes: [{
            name: 'user_phone_email_company_idx',
            unique: true,
            fields: ['countryCode', 'phone', 'email', 'companyUid']
        }]
    });

    User.associate = function (models) {

    };
    return User;
};
