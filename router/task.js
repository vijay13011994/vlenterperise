const express = require('express');
const { getTask, createTask, deleteTask } = require('../app/controllers/task.controllers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/')
.get(auth, getTask)
.post(auth, createTask);

router
.route('/:id')
.delete(deleteTask);


module.exports = router;