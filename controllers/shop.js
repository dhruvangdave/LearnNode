// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//     // const products = adminData.products;
//     Product.fetchAll(products => {
//         res.render('shop/product-list', {
//             prods: products,
//             pageTitle: 'All Products',
//             path: '/products',
//             hasProducts: products.length > 0,
//             activeShop: true,
//             productCSS: true,
//             // layout: false
//         });
//     });
//
//     // console.log(adminData.products);
//     // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
//
//     // res.send('<h1>Hello from Express!</h1>'); // Printed
// }

// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;
//     Product.findById(prodId, product => {
//         res.render('shop/product-detail', {pageTitle: product.title,product: product, path: '/products'})
//     });
//     res.redirect('/');
// }

// exports.getIndex = (req, res, next) => {
//     Product.fetchAll(products => {
//         res.render('shop/index', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/',
//         });
//     });
// }

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart');
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}
// exports.products = products;


// Using DB
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, index]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch(err => console.log('error', err));
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: rows.length > 0,
                activeShop: true,
                productCSS: true,
            });
        })
        .then(err => console.log('Err', err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                pageTitle: product.title,
                product: product[0],
                path: '/products'
            });
        })
        .catch(err => console.log('Err', err));
}