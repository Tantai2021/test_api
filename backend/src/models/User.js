const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullname: { type: DataTypes.STRING(190), allowNull: false },
    email: { type: DataTypes.STRING(190), allowNull: false },
    className: { type: DataTypes.STRING(190), allowNull: false },
    mssv: { type: DataTypes.STRING(190), allowNull: false }
}, { timestamps: false });

module.exports = User;
