const User = require("../models/user");
const variable_status = require("../config/variable_status");



const createUser = async (req, res, next) => {
    const user = {
        email,
        status,
        emp_username,
        contract,
        role,
    } = req.body

    user.date = date = new Date().toString()
    const newUser = await User.createUser(user)
    res.send({ "user": newUser })
};
module.exports.createUser = createUser;


const updateUser = async (req, res, next) => {
    const user = {
        email,
        password
    } = req.body
    const newUser = await User.updateUser(user, req.params.id)
    res.send({ "user": newUser })
};
module.exports.updateUser = updateUser;


const deleteUser = async (req, res, next) => {
    const deleteUser = await User.deleteUser(req.params.id)
    res.send({ "user": deleteUser })
};
module.exports.deleteUser = deleteUser;


const getAllUser = async (req, res, next) => {
    const getUser = await User.find()
    res.send({ "user": getUser })
};
module.exports.getAllUser = getAllUser;


const getUserById = async (req, res, next) => {
    const getUser = await User.find({ _id: req.params.id })
    res.send({ "user": getUser })
};
module.exports.getUserById = getUserById;

// --------------------------------------------------------------------------



