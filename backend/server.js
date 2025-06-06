const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./src/config/db");
const Router = require("./src/routes/index");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000
app.use(express.json());

// Routes
Router(app);

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
// Kết nối và đồng bộ database
const startServer = async () => {
    try {
        await sequelize.authenticate();  // Kiểm tra kết nối DB
        console.log("✅ Kết nối MySQL thành công!");

        await sequelize.sync({ alter: true });  // Đồng bộ database
        console.log("✅ Database đồng bộ thành công!");

    } catch (err) {
        console.error("❌ Lỗi kết nối MySQL:", err);
    }
};

startServer();  // Gọi hàm khởi chạy

module.exports = app;
