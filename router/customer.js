const express = require('express');
const { getCustomer, createCustomer } = require('../app/controllers/customer.controllers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/')
.get(auth, getCustomer)
.post(auth, createCustomer);

module.exports = router;