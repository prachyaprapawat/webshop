const loginLdap = require("../utils/ldap");
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    loginLdap.loginLdap(req.body.email, req.body.password).then(async (result) => {
        const cryptr = new Cryptr('secretepassword');
        const encrypepassword = cryptr.encrypt(req.body.password);
        const email = result.userPrincipalName.split("@")[0]
        let ldaprole = ''
        result.description === "IT Student" ? ldaprole = "student" : ldaprole = "teacher"
        const resdata = {
            firstname: result.givenName,
            lastname: result.sn,
            email: email,
            role: ldaprole,
            uid: result.uSNCreated,
        }
        const token = 'Bearer ' + jwt.sign(
            { email: req.body.email, password: encrypepassword },
            'itkmitl',
            { expiresIn: "6h" })
        console.log('Authenticated successfully');
        return res.status(200).json({
            status: 'Success',
            data: resdata,
            token: token
        })
    })
};
module.exports.login = login;

// --------------------------------------------------------------------------
