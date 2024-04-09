const express = require('express');
const { getProducts, createProduct } = require('../app/controllers/product.controllers');
const { getMappedProducts, mapProduct, getMappedProductsByOppId, deleteMappedProduct, updateMappedProduct } = require('../app/controllers/productmapping.controllers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/')
.get(auth, getMappedProducts)
.post(auth, mapProduct);

router
.route('/:id')
.post(auth, updateMappedProduct)
.delete(auth, deleteMappedProduct);

router
.route('/byoppid/:id')
.get(auth, getMappedProductsByOppId);

module.exports = router;