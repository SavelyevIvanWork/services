const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {userSearch} = require("../models/userModel");
const {userCreate} = require("../models/userModel");
const {validationResult} = require('express-validator')
require('dotenv').config();


const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}

exports.userRegistration = async function(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации!', errors})
        }
        const {username, password} = req.body
        const candidate = await userSearch({username})
        if (candidate) {
            return res.status(400).json({message: 'Пользователь с таким именем уже существует!'})
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        await userCreate({username, password: hashPassword})
        return res.json({message: 'Пользователь успешно зарегестрирован!'})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Ошибка регистрации!'})
    }
}

exports.userLogin = async function(req, res) {
    try {
        const {username, password} = req.body
        const user = await userSearch({username})
        console.log(user)
        if (!username) {
            res.status(400).json({message: `Пользователь с именем ${username} не найден!`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(400).json({message: `Введен неверный пароль!`})
        }
        const token = generateAccessToken(user._id)
        return res.json({token})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Неверный логин!'})
    }
}
