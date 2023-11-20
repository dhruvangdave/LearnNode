const path = require('path');

const express = require('express');
const rootDir = require('../helpers/path')

const router = express.Router();

const products = [];
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });

    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.send('<form action="/admin/add-product" method="POST"><input name="title" type="text"><button>Add Product</button></form>');
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    // console.log(req.body);
    products.push({title: req.body.title});
    res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;
