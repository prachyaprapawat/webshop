var express = require('express');
var router = express.Router();
const cartController = require("../controllers/cart-con");
const checkCart = require("../middlewares/check-cart")
const joiMiddle = require("../middlewares/joi-middle")


const catchAsync = require("../utils/catchAsync")
router.route('/')
    .post(joiMiddle.validateCartSchema, catchAsync(cartController.createCart))
    .get(catchAsync(cartController.getCartByUser))
router.route('/:id')
    .patch(catchAsync(checkCart.checkPermit()), catchAsync(cartController.updateCart))
    .delete(catchAsync(checkCart.checkPermit()), catchAsync(cartController.deleteCart))


module.exports = router;
