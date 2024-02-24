// const fs = require('fs');
// const path = require('path');
const rootDir = require('../helpers/path')
// const products = [];
const db = require('../helpers/database')

// const p = path.join(rootDir, 'data', 'products.json');
// const Cart = require('../models/cart');

// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         }
//         return cb(JSON.parse(fileContent));
//     })
// }

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // save() {
    //     // products.push(this);
    //     getProductsFromFile(products => {
    //         if (this.id) {
    //             const existingProductIndex = products.findIndex(product => product.id === this.id)
    //             const updatedProducts = [...products];
    //             updatedProducts[existingProductIndex] = this;
    //             fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //                 console.log('Err', err)
    //             });
    //         } else {
    //             this.id = Math.random().toString();
    //             products.push(this);
    //             fs.writeFile(p, JSON.stringify(products), (err) => {
    //                 console.log('Err', err)
    //             });
    //         }
    //     });
    // }

    // static fetchAll(cb) {
    //     // return products;
    //     getProductsFromFile(cb);
    // }

    // static findById(id, cb) {
    //     getProductsFromFile(products => {
    //         const product = products.find((item) => item.id === id);
    //         cb(product);
    //     })
    // }

    // static deleteById(id) {
    //     getProductsFromFile(products => {
    //         const product = products.find((item) => item.id === id);
    //         const updatedProducts = products.filter((item) => item.id !== id);
    //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //             if (!err) {
    //                 Cart.deleteProduct(id, product.price)
    //             }
    //         });
    //     })
    // }

    // Using DB queries
    save() {
        return db.execute("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
            [this.title, this.price, this.imageUrl, this.description]
        )
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
    }

    static deleteById(id) {

    }
}
