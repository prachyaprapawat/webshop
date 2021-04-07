var express = require('express');
var router = express.Router();
const orderController = require("../controllers/order-con");


const catchAsync = require("../utils/catchAsync")
router.route('/')
    .post(orderController.createOrder)
    .get(catchAsync(orderController.getOrderByUser))
router.route('/:id')
    .delete(catchAsync(orderController.deleteOrder))
    .get(catchAsync(orderController.getOrderById))


module.exports = router;
