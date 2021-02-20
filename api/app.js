const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const home_route = require('./routers/routers')
const passport = require("passport");
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use('/todo', home_route)

// mongoose.set('bufferCommands', false); // отключить команды буффера

//Установим подключение
mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.Promise = global.Promise;

// Получение подключения по умолчанию
const db = mongoose.connection;

// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = 8080

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});





