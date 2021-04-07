const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

const variable_status = require("../config/variable_status");
const getHeaderAuthorization = require("../utils/header-auth");


module.exports.createOrder = async (req, res, next) => {
    const order = {
        firstname,
        lastname,
        country,
        province,
        district,
        Sub_district,
        postal_code,
        tel,
        Deliver,
        payment
    } = req.body
    order.email = getHeaderAuthorization(req).email
    order.item = await Cart.aggregate([
        {
            $match: { status: variable_status.order.waiting_checkout, email: order.email }
        },
        {
            $project: { product_id: 1, amount: 1 }
        }
    ])
    if (order.item.length > 0) {
        await Cart.updateMany(
            {
                email: order.email, status: variable_status.order.waiting_checkout
            }, {
            $set: { status: variable_status.order.checkout }
        })
        const newOrder = await Order.createOrder(order)
        res.send({ "order": newOrder })
    } else {
        res.status(400).send({ "data": "No item in cart" })
    }
};


module.exports.deleteOrder = async (req, res, next) => {
    const deleteOrder = await Order.deleteOrder(req.params.id)
    if (deleteOrder) {
        res.send({ "order": deleteOrder })
    } else {
        res.status(400).send({ "data": "Dont have this id" })
    }

};


module.exports.getOrderByUser = async (req, res, next) => {
    const getOrder = await Order.find({ email: getHeaderAuthorization(req).email })
    res.send({ "order": getOrder })
};


module.exports.getOrderById = async (req, res, next) => {
    const getOrder = await Order.findOne({ _id: req.params.id })
    const getOrderItem = getOrder.item
    const idItem = getOrderItem.map((item) => {
        return item.product_id
    })
    const getProduct = await Product.find({ '_id': { $in: idItem } })
    let datailItem = []
    getOrderItem.map((item) => {
        getProduct.map((product) => {
            if (item.product_id == product._id) {
                product.amount = item.amount
                datailItem.push(product)
            }
        })
    })

    let getOrderAndDetail = Object.assign({}, getOrder._doc);
    getOrderAndDetail.item = datailItem
    if (getOrderAndDetail) {
        res.send({ "order": getOrderAndDetail })
    } else {
        res.status(400).send({ "data": "Dont have this id" })
    }
};
// --------------------------------------------------------------------------

