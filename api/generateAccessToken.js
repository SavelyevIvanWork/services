const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}