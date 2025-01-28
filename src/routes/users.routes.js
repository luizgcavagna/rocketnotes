const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post('/create', userController.create);
usersRoutes.put('/update/:id', userController.update);

module.exports = usersRoutes;