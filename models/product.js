var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var ProductSchema = mongoose.Schema({
    product_name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number
    },
    email: {
        type: String
    },
    status: {
        type: String,
        default: 'active'
    },
    view: {
        type: Boolean,
        default: true
    },
    all_rating: {
        type: [
            {
                email: { type: String },
                rating: { type: Number, },
                date: {
                    type: Date,
                    default: new Date
                }
            }
        ]
    },
    date: {
        type: Date,
        default: new Date
    }
});

const Product = module.exports = mongoose.model('product', ProductSchema)


const createProduct = (product) => {
    const newProduct = Product.create(product).then(e => {
        return e
    })

    return newProduct
};
module.exports.createProduct = createProduct;



const updateProduct = async (product, id) => {
    console.log(id)
    var updateData = {}
    Object.keys(product).map((loopdata, index) => {
        updateData[loopdata] = Object.values(product)[index]
        console.log(updateData)
    })
    const updataProfile = await Product.findOneAndUpdate({
        _id: id
    }, {
        $set: updateData
    }, { new: true })
    return updataProfile
};
module.exports.updateProduct = updateProduct;


const deleteProduct = async (id) => {
    const deleteProduct = await Product.findOneAndRemove({
        _id: id
    })
    return deleteProduct
};
module.exports.deleteProduct = deleteProduct;

//   ------------------------------------------------------------
