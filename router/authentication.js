const express = require('express');
const { login, authenticate, isSessionValid, logout } = require('../app/controllers/auth.contollers');
const router = express.Router();

router
.route('/login')
.post(login);

router
.route('/logout')
.get(logout);

module.exports = router;