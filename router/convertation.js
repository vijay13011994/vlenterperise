const express = require('express');
const { auth } = require('../app/middlewares');
const { createConvertation, getConvertationByContactId } = require('../app/controllers/convertation.controller');
const router = express.Router();

router
.route('/')
.post(auth, createConvertation);

router
.route('/contact/:id')
.get(auth, getConvertationByContactId)


module.exports = router;