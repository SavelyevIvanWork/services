const express = require('express')
const mongoose = require('mongoose');


// Создаём схему

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    id: String,
    completed: Boolean,
    message: String,
    user: String
});

// Компилируем модель из схемы
const Todo = mongoose.model('Todo', TodoSchema);

//Создаём экземпляр модели
exports.todoCreate = async function (userId, {message}) {
    const todo = new Todo({
        user: userId,
        completed: false,
        message
    })
    // Сохраняем модель
    return await todo.save();
}

exports.taskSearch = function (userId, id) {
    return Todo.findOne({user: userId, _id: id})
}

exports.todoGet = function (userId) {
    console.log(userId)
    return Todo.find({user: userId})
}

exports.todoUpdate = function (userId, id, completed) {
    try {
        return Todo.findOneAndUpdate({_id: id, user: userId}, {completed}, {
            new: true
        })
    } catch (error) {
        console.log(error)
    }
}

exports.allTodoUpdate = function (userId) {
    return Todo.updateMany({user: userId}, {completed: true})
}

exports.todoDelete = function (userId, id) {
    return Todo.findOneAndDelete({_id: id, user: userId})

}

exports.allTodoDelete = function (userId) {
    return Todo.deleteMany({user: userId, completed: true})
}
