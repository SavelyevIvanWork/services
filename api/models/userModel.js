const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    facebookId: {type: String},
});
const User = model('User', UserSchema);
exports.User = model('User', UserSchema);

exports.userSearch = function({username}) {
    return User.findOne({username})
}

exports.userCreate = async function ({username, password}) {
    const user = new User({
        username,
        password
    })
    return await user.save();
}

exports.userCreateFb = async function ({username, facebookId}) {
    const user = new User({
        username,
        facebookId,
    })
    return await user.save();
}




