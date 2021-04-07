const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});


const Joi = BaseJoi.extend(extension)


module.exports.UserSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().escapeHTML(),
    password: Joi.string().required().escapeHTML(),
});


module.exports.CartSchema = Joi.object({
    product_id: Joi.string().required().escapeHTML(),
    amount: Joi.number().required(),
});


module.exports.OrderSchema = Joi.object({
    firstname: Joi.string().escapeHTML().required(),
    lastname: Joi.string().escapeHTML().required(),
    country: Joi.string().escapeHTML().required(),
    province: Joi.string().escapeHTML().required(),
    district: Joi.string().escapeHTML().required(),
    Sub_district: Joi.string().escapeHTML().required(),
    postal_code: Joi.string().escapeHTML().required(),
    tel: Joi.string().escapeHTML().required(),
    payment: Joi.string().escapeHTML().required(),
    Deliver: Joi.string().escapeHTML().required(),

});




module.exports.ProductSchema = Joi.object({
    product_name: Joi.string().escapeHTML(),
    description: Joi.string().escapeHTML(),
    price: Joi.number().integer().required(),
    discount: Joi.number().integer()
});
