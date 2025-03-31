const userModel = require('../models/User');
const Op = require('sequelize');
const User = {
    getUsers: async (req, res) => {
        try {
            const users = await userModel.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Loi khi lay du lieu user" });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findOne({
                where: { id: userId }
            });
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Loi khi lay du lieu user" });
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { fullname, mssv, className, email } = req.body;
            if (!userId || !fullname || !mssv || !className || !email)
                return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
            const user = await userModel.findOne({
                where: { id: userId }
            });
            if (!user)
                return res.status(400).json({ message: "Người dùng không tồn tại" });
            const existMssv = await userModel.findOne({
                where: {
                    mssv: mssv
                }
            });
            if (existMssv && existMssv.id !== Number(userId))
                return res.status(400).json({ message: "Mssv bị trùng" });
            const existEmail = await userModel.findOne({
                where: {
                    email: email
                }
            });
            if (existEmail && existEmail.id !== Number(userId))
                return res.status(400).json({ message: "Email bị trùng" });
            await userModel.update({
                fullname: fullname,
                mssv: mssv,
                email: email,
                className: className
            }, { where: { id: userId } });
            return res.status(200).json({ message: "Sửa thông tin người dùng thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Loi khi sua du lieu user" });
        }
    },
    addUser: async (req, res) => {
        try {
            const { fullname, mssv, className, email } = req.body;
            if (!fullname || !mssv || !className || !email)
                return res.status(400).json({ message: "Thiếu thông tin cần thiết", status: 'failed' });

            // Kiểm tra MSSV trùng
            const existMssv = await userModel.findOne({ where: { mssv: mssv } });
            if (existMssv)
                return res.status(400).json({ message: "Mssv bị trùng", status: 'failed' });

            // Kiểm tra Email trùng
            const existEmail = await userModel.findOne({ where: { email: email } });
            if (existEmail)
                return res.status(400).json({ message: "Email bị trùng", status: 'failed' });

            // Tìm user có ID lớn nhất
            const lastUser = await userModel.findOne({
                attributes: ["id"],
                order: [["id", "DESC"]]
            });

            // Xác định ID mới
            const newId = lastUser ? lastUser.id + 1 : 1;

            // Thêm user với ID mới
            await userModel.create({
                id: newId, // Thủ công đặt ID
                fullname,
                mssv,
                email,
                className
            });

            return res.status(200).json({ message: "Thêm thành công", status: 'success' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi khi thêm dữ liệu user", status: 'failed' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: "ID không hợp lệ" });
            }
            const user = await userModel.findOne({
                where: { id: userId }
            });
            if (!user)
                return res.status(400).json({ message: "Người dùng không tồn tại" });
            await userModel.destroy({ where: { id: userId } });
            return res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Loi khi xoa du lieu user" });
        }
    },
};
module.exports = User;