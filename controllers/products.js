// const products = [];
const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });

    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.send('<form action="/admin/add-product" method="POST"><input name="title" type="text"><button>Add Product</button></form>');
}

exports.postAddProducts = (req, res, next) => {
    // console.log(req.body);
    // products.push({title: req.body.title});
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getShop = (req, res, next) => {
    // const products = adminData.products;
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
            // layout: false
        });
    });

    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // res.send('<h1>Hello from Express!</h1>'); // Printed
}

// exports.products = products;
