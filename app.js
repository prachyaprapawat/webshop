
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors')

// myimport --------------------
const listEndpoints = require("express-list-endpoints");
const ExpressError = require('./utils/ExpressError');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
var passport = require('passport');
require('./config/passport')(passport);



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ------connect DB------
require('./config/database')
// ---------

app.use(cors())
app.use(mongoSanitize({
    replaceWith: '_'
}))
app.use(helmet());


const requireJWTAuth = passport.authenticate("jwt", {
    // successRedirect: '/',
    // failureRedirect: '/hello',
    session: false
  });
  
app.use('/', indexRouter);
app.use('/user',requireJWTAuth,usersRouter);
app.use('/product',requireJWTAuth, productRouter);
app.use('/cart',requireJWTAuth, cartRouter);
app.use('/order',requireJWTAuth, orderRouter);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Error'
    res.status(statusCode).json({ error: err })
})


const port = process.env.PORT || 8080;

var server = app.listen(port, function () {
    console.log('Ready on port %d', server.address().port);
});




module.exports = app;
