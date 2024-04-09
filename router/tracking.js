const express = require('express');
const { createTracking } = require('../app/controllers/tracking.controller');
const router = express.Router();

router.route('/').post(createTracking);
module.exports = router;