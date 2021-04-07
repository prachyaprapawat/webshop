const jwt = require("jsonwebtoken");
module.exports = (req) => {
    const token = req.headers.authorization.replace('Bearer ','')
    user = jwt.verify(token,   process.env.MY_SECRET_KEY);
    return user
}
