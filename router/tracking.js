const express = require('express');
const { createTracking, getTracking } = require('../app/controllers/tracking.controller');
const router = express.Router();

router
.route('/')
.post(createTracking)

router
.route('/get')
.post(getTracking);

module.exports = router;