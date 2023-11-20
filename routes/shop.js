const path = require('path');

const express = require('express');
const rootDir = require('../helpers/path')

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'My Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        // layout: false
    });

    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // res.send('<h1>Hello from Express!</h1>'); // Printed
});

module.exports = router;
