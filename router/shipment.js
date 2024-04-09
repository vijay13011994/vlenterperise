const express = require('express');
const { auth } = require('../app/middlewares');
const { getShipment, createShipment, getShipmentById, deleteShipment } = require('../app/controllers/shipment.controller');
const router = express.Router();

router
.route('/')
.get(auth, getShipment)
.post(auth, createShipment);


router
.route('/:id')
.get(auth, getShipmentById)
.delete(auth, deleteShipment);

module.exports = router;