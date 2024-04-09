const express = require('express');
const { auth } = require('../app/middlewares');
const { getReversal, createReversal, getReversalById, deleteReversal } = require('../app/controllers/reversal.controller');
const router = express.Router();

router
.route('/')
.get(auth, getReversal)
.post(auth, createReversal);


router
.route('/:id')
.get(auth, getReversalById)
.delete(auth, deleteReversal);

module.exports = router;