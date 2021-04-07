var express = require('express');
var router = express.Router();
const login = require("../controllers/login");

router.route('/')
    .post(login.login)


module.exports = router;