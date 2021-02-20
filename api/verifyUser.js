const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verifyUser =  async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(403).json({message: 'Пользователь не авторизован', isFetching: ''})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'Пользователь не авторизован', isFetching: ''})
    }
};
