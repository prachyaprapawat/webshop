var express = require('express');
var router = express.Router();
const path = require('path')

const loginController = require("../controllers/login-con");
const catchAsync = require("../utils/catchAsync")
const joiMiddle = require("../middlewares/joi-middle")

router.get('/', function(req, res, next) {
  res.send('Hello Webshop Api');
});

router.route('/login')
  .post(joiMiddle.validateUserSchema,catchAsync(loginController.login))

router.route('/register')
  .post(joiMiddle.validateUserSchema,catchAsync(loginController.register))


  router.get('/sitemap.xml', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/sitemap/sitemap.xml'));
  });


module.exports = router;
