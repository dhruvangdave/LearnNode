// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input name="title" type="text"><button>Add Product</button></form>');
    // res.send('<h1>Product is added!</h1>'); // Printed
    // next(); // Allows request to continue to the next middleware
})

app.use('/', (req, res, next) => {
    console.log('In another middleware?');
    res.send('<h1>Hello from Express!</h1>'); // Printed
})

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000); // Replacement for the upper two lines
