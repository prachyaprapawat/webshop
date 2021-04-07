var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var OrderSchema = mongoose.Schema({
    email: {
        type: String
    },
    status: {
        type: String,
        default: 'waiting_confirm_order'
    },

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    country: {
        type: String
    },
    province: {
        type: String
    },
    district: {
        type: String
    },
    Sub_district: {
        type: String
    },
    postal_code: {
        type: String
    },
    tel: {
        type: String
    },
    item: {
        type: [
            {
                product_id: {
                    type: String
                },
                amount: {
                    type: String
                }
            }
        ]
    },
    Deliver: {
        type: String
    },
    payment: {
        type: String
    },
    date: {
        type: Date,
        default: new Date
    },
});

var Order = module.exports = mongoose.model('order', OrderSchema)


const createOrder = (order) => {
    const newOrder = Order.create(order).then(e => {
        return e
    })
    return newOrder
};
module.exports.createOrder = createOrder;



const updateOrder = async (order, id) => {
    console.log(id)
    var updateData = {}
    Object.keys(order).map((loopdata, index) => {
        updateData[loopdata] = Object.values(order)[index]
        console.log(updateData)
    })
    const updataProfile = await Order.findOneAndUpdate({
        _id: id
    }, {
        $set: updateData
    }, { new: true })
    return updataProfile
};
module.exports.updateOrder = updateOrder;


const deleteOrder = async (id) => {
    const deleteOrder = await Order.findOneAndRemove({
        _id: id
    })
    return deleteOrder
};
module.exports.deleteOrder = deleteOrder;

//   ------------------------------------------------------------
