// const http = require('http');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { engine  } = require('express-handlebars');

const app = express();

// app.engine('hbs', engine({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);
// Only called using post method
// app.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });

// app.use('/add-product', (req, res, next) => {
//     res.send('<form action="/product" method="POST"><input name="title" type="text"><button>Add Product</button></form>');
//     // res.send('<h1>Product is added!</h1>'); // Printed
//     // next(); // Allows request to continue to the next middleware
// })

// app.use('/', (req, res, next) => {
//     console.log('In another middleware?');
//     res.send('<h1>Hello from Express!</h1>'); // Printed
// })

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000); // Replacement for the upper two lines
