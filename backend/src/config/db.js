const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            charset: "utf8"  // ✅ Dùng utf8 thay vì utf8mb4
        },
        logging: false,
    }
);

module.exports = sequelize;  // ✅ Export sequelize instance
