const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require('../models/user');
const passport = require("passport");
module.exports = function (passport) {


  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.MY_SECRET_KEY
  }
  const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log(payload.email)
    const dataObj = await User.findOne({ email: payload.email })
    if (payload.email === dataObj.email
    ) {
      return done(null, true);
    }
    else {

      done(null, false);
    }
  });

  passport.use(jwtAuth);


  // --------------------------------------------------



};