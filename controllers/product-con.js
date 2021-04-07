const Product = require("../models/product");
const Cart = require("../models/cart");

const getHeaderAuthorization = require("../utils/header-auth");
const ExpressError = require('../utils/ExpressError');


module.exports.createProduct = async (req, res, next) => {
    const product = {
        product_name,
        description,
        price,
        discount,
    } = req.body
    product.email = getHeaderAuthorization(req).email
    const newProduct = await Product.createProduct(product)
    res.send({ "product": newProduct })
};

module.exports.updateProduct = async (req, res, next) => {
    const product = {
        product_name,
        description,
        price,
    } = req.body
    const newProduct = await Product.updateProduct(product, req.params.id)
    if (newProduct) {
        res.send({ "product": newProduct })
    } else {
        res.status(400).send({ "data": "Dont have this id" })
    }

};


module.exports.deleteProduct = async (req, res, next) => {
    const deleteProduct = await Product.deleteProduct(req.params.id)
    if (deleteProduct) {
        res.send({ "product": deleteProduct })
    } else {
        res.status(400).send({ "data": "Dont have this id" })
    }
};


module.exports.getAllProduct = async (req, res, next) => {
    const getProduct = await Product.aggregate(
        [
            {
                $match: {
                    $or: [{
                        view: true
                    }, {
                        email: getHeaderAuthorization(req).email
                    }
                    ]
                }
            },
            {
                $project: {
                    all_rating: { $sum: "$all_rating.rating" },
                    count_rate: { $size: "$all_rating" },
                    description: 1,
                    price: 1,
                    discount: 1,
                    email: 1,
                    status: 1,
                    view: 1,
                    date: 1,
                }
            }
        ]
    )
    res.send({ "product": getProduct })
};


module.exports.getProductById = async (req, res, next) => {
    const getProduct = await Product.find({ _id: req.params.id })
    if (getProduct) {
        res.send({ "product": getProduct })
    } else {
        res.status(400).send({ "data": "Dont have this id" })
    }
};


module.exports.getProductBySearch = async (req, res, next) => {
    const getProductBySearch = await Product.find(
        {
            $or: [
                { product_name: req.body.search },
                { email: req.body.search },
                { description: req.body.search },
            ],
            $or: [
                { view: true },
                { email: getHeaderAuthorization(req).email }
            ]
        }
    )
    res.send({ "product": getProductBySearch })
};


module.exports.giveRating = async (req, res, next) => {
    const data = {
        rating,
        product_id
    } = req.body
    if (rating > 0 && rating <= 5) {
        const ratingProduct = { rating }
        ratingProduct.email = getHeaderAuthorization(req).email

        const newProduct = await Product.findOneAndUpdate(
            {
                "all_rating.email": { $nin: [ratingProduct.email] },
                _id: ObjectId.fromString(product_id)
            },
            {
                $push: { all_rating: ratingProduct }
            },
            { new: true }
        )

        if (newProduct === null) {
            res.status(400).send({ "data": "User rating Already " })
        } else {
            res.send({ "rating": newProduct })
        }
    } else {
        res.status(400).send({ "data": "rating only 1 - 5" })
    }
};

module.exports.setView = async (req, res, next) => {
    const {
        product_id,
        view
    } = req.body
    const getProduct = await Product.findOneAndUpdate(
        {
            _id: product_id
        },
        {
            view: view
        })
    res.send({ "product": getProduct })
};

module.exports.topSellerProduct = async (req, res, next) => {
    const getProduct = await Cart.aggregate(
        [

            {
                $group: {
                    _id: "$product_id",
                    checkout: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    product_id: {
                        $toObjectId: "$_id"
                    },
                    checkout: 1,
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'productdetail'
                }
            },
            {
                $project: {
                    'productdetail.all_rating': 0
                }
            },

            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$productdetail", 0] }, "$$ROOT"] } }
            },
            {
                $project: {
                    productdetail: 0
                }
            },
            {
                $match: {
                    $or: [{
                        view: true
                    }, {
                        email: getHeaderAuthorization(req).email
                    }],
                    view: true
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]
    ).limit(5)
    res.send({ "topseller": getProduct })
};