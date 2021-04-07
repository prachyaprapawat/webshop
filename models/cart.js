var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var CartSchema = mongoose.Schema({
    product_id: {
        type: String
    },
    amount: {
        type: Number
    },
    email: {
        type: String
    },
    status: {
        type: String,
        default: 'waiting_checkout'
    },
    date: {
        type: Date,
        default: new Date
    }
});

var Cart = module.exports = mongoose.model('cart', CartSchema)


const createCart = (cart) => {
    const newCart = Cart.create(cart).then(e => {
        return e
    })
    return newCart
};
module.exports.createCart = createCart;



const updateCart = async (cart, id) => {
    console.log(id)
    var updateData = {}
    Object.keys(cart).map((loopdata, index) => {
        updateData[loopdata] = Object.values(cart)[index]
        console.log(updateData)
    })
    const updataProfile = await Cart.findOneAndUpdate({
        _id: id
    }, {
        $set: updateData
    }, { new: true })
    return updataProfile
};
module.exports.updateCart = updateCart;


const deleteCart = async (id) => {
    const deleteCart = await Cart.findOneAndRemove({
        _id: id
    })
    return deleteCart
};
module.exports.deleteCart = deleteCart;

//   ------------------------------------------------------------
