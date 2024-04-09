const express = require('express');
const { getProducts, createProduct, deleteProduct, getProductById } = require('../app/controllers/product.controllers');
const { auth } = require('../app/middlewares');
const router = express.Router();

router
.route('/')
.get(auth, getProducts)
.post(auth, createProduct);

router
.route('/:id')
.get(auth, getProductById)
.delete(auth, deleteProduct);



module.exports = router;