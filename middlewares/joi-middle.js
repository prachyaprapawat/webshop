
const {
    ProductSchema,
    CartSchema,
    OrderSchema,
    UserSchema
} = require('../schemasJoi');
const ExpressError = require('../utils/ExpressError');



module.exports.validateOrderSchema = (req, res, next) => {
    const { error } = OrderSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.validateCartSchema = (req, res, next) => {
    const { error } = CartSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.validateProductSchema = (req, res, next) => {
    const { error } = ProductSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateUserSchema = (req, res, next) => {
    const { error } = UserSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

