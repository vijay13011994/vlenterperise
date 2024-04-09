const express = require('express');
const { auth } = require('../app/middlewares');
const { getContacts, createContact, deleteContact, getContactsByAccountId, getContactById } = require('../app/controllers/contact.controller');
const router = express.Router();

router
.route('/')
.get(auth, getContacts)
.post(auth, createContact);

router
.route('/:id')
.get(auth, getContactById)
.delete(auth, deleteContact);

router
.route('/account/:id')
.get(auth, getContactsByAccountId);

module.exports = router;