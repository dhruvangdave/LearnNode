const path = require('path');

const express = require('express');
const rootDir = require('../helpers/path')
const adminController = require('../controllers/admin')
const router = express.Router();

router.get('/get-path', adminController.getTest)

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProducts);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;
// exports.routes = router;
