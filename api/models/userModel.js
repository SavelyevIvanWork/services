const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const User = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    facebookId: {type: String},
});
const UserModels = model('User', User);
exports.UserModels = model('User', User);

exports.userSearch = function({username}) {
    return UserModels.findOne({username})
}

exports.userCreate = async function ({username, password}) {
    const user = new UserModels({
        username,
        password
    })
    return await user.save();
}

exports.userCreateFb = async function ({username, facebookId}) {
    const user = new UserModels({
        username,
        facebookId,
    })
    return await user.save();
}




