const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const ExpressError = require('../utils/ExpressError');

module.exports.checkPermit = (permitted) => {
  return async (req, res, next) => {

    const user = jwt.verify(req.headers.authorization.replace('Bearer ', ''),    process.env.MY_SECRET_KEY);

    if (permitted.includes('owner')) {
      const checkProduct = await Product.findOne({ _id: req.params.id })
        .catch(err => {
          throw new ExpressError('wrong id', 400)
        })
        if (checkProduct === null) {
          throw new ExpressError('cant find data ', 400)
        }
      if (user.email === checkProduct.email) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" }); 
      }
    } else if (permitted.includes('other')) {
      const checkProduct = await Product.findOne({ _id: req.body.product_id })
        .catch(err => {
          throw new ExpressError('wrong id', 400)
        })
        if (checkProduct === null) {
          throw new ExpressError('cant find data ', 400)
        }
      if (user.email !== checkProduct.email) {
        next()
      } else {
        res.status(401).json({ message: "Unauthorized" }); 
      }
    }
  }
}