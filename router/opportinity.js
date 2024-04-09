const express = require('express');
const { getOppourtinities, createOppourtinity, deleteOppourtinities, getOppourtinityById, getOpportinityByAccountId } = require('../app/controllers/oppourtinity.controllers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/')
.get(auth, getOppourtinities)
.post(auth, createOppourtinity);


router
.route('/:id')
.get(auth, getOppourtinityById)
.delete(auth, deleteOppourtinities);

router
.route('/account/:id')
.get(auth, getOpportinityByAccountId)


module.exports = router;