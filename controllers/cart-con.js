const Cart = require("../models/cart");
const variable_status = require("../config/variable_status");
const getHeaderAuthorization = require("../utils/header-auth");



module.exports.createCart = async (req, res, next) => {
    const cart = {
        product_id,
        amount,
    } = req.body
    cart.email = getHeaderAuthorization(req).email
    const newCart = await Cart.createCart(cart)
    res.send({ "cart": newCart })
};

module.exports.updateCart = async (req, res, next) => {
    const cart = {
        amount
    } = req.body
    const newCart = await Cart.updateCart(cart, req.params.id)
    if (newCart) {
        res.send({ "cart": newCart })
    } else {
        res.status(400).send({ "data": "wrong id" })
    }
};

module.exports.deleteCart = async (req, res, next) => {
    const deleteCart = await Cart.deleteCart(req.params.id)
    console.log(deleteCart=== null)
    if (deleteCart === null) {
        res.status(400).send({ "data": "wrong id" })

    } else {
        res.send({ "cart": deleteCart })

    }
};

module.exports.getCartByUser = async (req, res, next) => {
    const getCart = await Cart.find({ email: getHeaderAuthorization(req).email })
    res.send({ "cart": getCart })
};

// --------------------------------------------------------------------------
