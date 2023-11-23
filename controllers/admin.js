const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        console.log('!editMode');
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            console.log('!product');
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode
        });
    });
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    console.log('productId', productId)
    if (!productId) {
        return  res.redirect('/');
    } else {
        Product.deleteById(req.params.productId)
        res.redirect('/admin/products');
        //     , products => {
        //     res.render('admin/products', {
        //         prods: products,
        //         pageTitle: 'Products',
        //         path: 'admin/products'
        //     })
        // }
    }
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(produtcs => {
        res.render('admin/products', {
            prods: produtcs,
            pageTitle: 'Products',
            path: '/admin/products'
        })
    })
}
