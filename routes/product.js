var express = require('express');
var router = express.Router();
const productController = require("../controllers/product-con");


const joiMiddle = require("../middlewares/joi-middle")
const catchAsync = require("../utils/catchAsync")
const checkProduct = require("../middlewares/check-product")


router.route('/')
    .post(joiMiddle.validateProductSchema, catchAsync(productController.createProduct))
    .get(catchAsync(productController.getAllProduct))
router.route('/me/:id')
    .get(catchAsync(productController.getProductById))
    .patch(joiMiddle.validateProductSchema, catchAsync(checkProduct.checkPermit(["owner"])), catchAsync(productController.updateProduct))
    .delete(catchAsync(checkProduct.checkPermit(["owner"])), catchAsync(productController.deleteProduct))

router.route('/rating')
    .post(catchAsync(checkProduct.checkPermit(["other"])),productController.giveRating)
router.route('/top-seller')
    .get(catchAsync(productController.topSellerProduct))
router.route('/search')
    .get(catchAsync(productController.getProductBySearch))
module.exports = router;