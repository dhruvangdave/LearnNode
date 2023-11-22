const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/path')
// const products = [];

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        return cb(JSON.parse(fileContent));
    })
}

module.exports = class Product {
    constructor(paraTitle) {
        this.title = paraTitle;
    }

    save() {
        // products.push(this);
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log('Err', err)
            });
        });
    }

    static fetchAll(cb) {
        // return products;
        getProductsFromFile(cb);
    }
}
