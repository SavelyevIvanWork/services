const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const cors = require('cors')
const userController = require("../controllers/userController");
const {check} = require('express-validator')
const {verifyUser} = require("../verifyUser");
require('dotenv').config();

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
const {generateAccessToken} = require("../generateAccessToken");
const {UserModels} = require("../models/userModel");

// const corsOptions = {
//         "origin": "*",
//         "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//         // "exposedHeaders": 'Content-Length, X-Foo, X-Bar',
// }

router.get('/', verifyUser, todoController.todoGet)
router.post('/', verifyUser, todoController.todoCreate);
router.put('/:id', verifyUser, todoController.todoUpdate);
router.post('/all-todo-completed', verifyUser, todoController.allTodoUpdate);
router.delete('/:id', verifyUser, todoController.todoDelete);
router.post('/all-todo-delete', verifyUser, todoController.allTodoDelete);

router.post('/registration', [check ('username', 'Имя пользователя не должно быть пустым!').notEmpty(),
    check('password', 'Пароль должен быть не меньше 4 и не больше 10 символов!').isLength({min: 4, max: 10})],
    userController.userRegistration)

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8080/todo/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        UserModels.findOne({ facebookId: profile.id }, async function(err, user) {
            if(!user) {
                const newUser = new UserModels({ facebookId: profile.id });
                await newUser.save()
                return cb(null, newUser);
            }
            if (err) {
                return cb(err)
            }
            cb(null, user );
        });
    }
));

router.get('/auth/facebook', passport.authenticate('facebook', {session: false}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook',
        {session: false}),(req,res) => {
        const token = generateAccessToken(req.user._id);
        res.redirect(`http://localhost:3000/todo/callback?token=${token}`);
    });

router.post('/login', userController.userLogin)

module.exports = router;
