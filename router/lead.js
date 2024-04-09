const express = require('express');
const { getLeads, createLead, getLeadById, deleteLead, getLeadByUserId, getUnassignedLeads, updateUnassignedLead } = require('../app/controllers/lead.controllers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/')
.get(auth, getLeads)
.post(auth, createLead);

router
.route('/:id')
.get(auth,getLeadById)
.delete(auth, deleteLead);


router
.route('/owner/:ownerid')
.get(auth, getLeadByUserId);

router
.route('/get/unassigned')
.get(auth, getUnassignedLeads)

router
.route('/update/unassigned/:id')
.get(auth, updateUnassignedLead)

module.exports = router;