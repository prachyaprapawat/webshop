var jwtweb = require('jsonwebtoken');
var User = require('../models/user');
const bcrypt = require('bcryptjs');

const variable_status = require("../config/variable_status");
const ExpressError = require('../utils/ExpressError');



module.exports.login = async (req, res) => {

  try {
    const userData = await User.findOne({ email: req.body.email })
    if (userData) {
      console.log(await bcrypt.compare(req.body.password, userData.password) === false)
      if (await bcrypt.compare(req.body.password, userData.password) === false) {
        res.send({ status: "Wrong Username or Password" })
      } else {
        var userToken = jwtweb.sign({
          email: req.body.email,
        },
          process.env.MY_SECRET_KEY
          , { expiresIn: 60 * 60 * 3 }
        );
        res.send({ "token": userToken });
      }

    } else {
      res.send({ status: "Wrong Username or Password" }).status(401)
    }
  } catch (err) {
    console.error(err)
    res.send({ status: "Wrong Username or Password" }).status(401);
  }

}

module.exports.register = async (req, res) => {
  let user = {
    email,
    password
  } = req.body
  console.log(user)

  try {
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        user.password = hash
        const newUser = await User.createUser(user)
          .catch(err => {
            res.status(400).send({ "user": "cant create user please use other email" });
          })
        res.send({ "user": newUser });

      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: "Worng  !!" });
  }
}














