const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.addUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

module.exports = router;