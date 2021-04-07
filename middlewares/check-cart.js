const jwt = require("jsonwebtoken");
const Cart = require("../models/cart");
const ExpressError = require('../utils/ExpressError');

module.exports.checkPermit = () => {
  return async (req, res, next) => {
    console.log('checkCart')

    const user = jwt.verify(req.headers.authorization.replace('Bearer ', ''),   process.env.MY_SECRET_KEY);
    const checkCart = await Cart.findOne({ _id: req.params.id })
      .catch(err => {
        throw new ExpressError('wrong id', 400)
      })
    console.log(checkCart)
    if (checkCart === null) {
      throw new ExpressError('cant find data ', 400)
    }
    if (user.email === checkCart.email) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }

  }
}