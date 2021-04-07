var express = require('express');
var router = express.Router();
const userController = require("../controllers/user-con");


const catchAsync = require("../utils/catchAsync")


router.route('/')
    .post(userController.createUser)
    .get(catchAsync(userController.getAllUser))
// router.route('/:id')
//     .get(catchAsync(userController.getUserById))
//     .put(catchAsync(userController.updateUser))
//     .delete(catchAsync(userController.deleteUser))



    
module.exports = router;
