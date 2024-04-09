const express = require('express');
const { login, isSessionValid, logout, getDashboardData, changePassword, deleteUser, getUserById, getUser, createUser } = require('../app/controllers/user.contollers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/login')
.post(login);

router
.route('/session')
.get(isSessionValid);

router
.route('/logout')
.get(logout);

router
.route('/')
.get(auth, getUser)
.post(auth, createUser);

router
.route('/get_dashboard_data')
.get(auth, getDashboardData);

router
.route('/change_password')
.post(auth, changePassword);

router
.route('/:id')
.get(auth, getUserById)
.delete(auth, deleteUser);

module.exports = router;