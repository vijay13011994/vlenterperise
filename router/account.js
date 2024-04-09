const express = require('express');
const { auth } = require('../app/middlewares');
const { getAccounts, createAccount, deleteAccount, getAccountById } = require('../app/controllers/account.controller');
const router = express.Router();

router
.route('/')
.get(auth, getAccounts)
.post(auth, createAccount);

router
.route('/:id')
.get(auth, getAccountById)
.delete(auth, deleteAccount);

module.exports = router;