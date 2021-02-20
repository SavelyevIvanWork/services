const express = require('express')
const mongoose = require('mongoose');


// Создаём схему

const Schema = mongoose.Schema;
const TodoModelSchema = new Schema({
    id: String,
    completed: Boolean,
    message: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Компилируем модель из схемы
const TodoModel = mongoose.model('TodoModel', TodoModelSchema);

//Создаём экземпляр модели
exports.todoCreate = async function (userId,{completed, message}) {
    const todo = new TodoModel({
        user: userId,
        completed: false,
        message
    })
    // Сохраняем модель
    return await todo.save();
}

exports.todoGet = function (userId) {
    return TodoModel.find({user: userId})
}

exports.todoUpdate = function (userId, id, completed) {
    return TodoModel.findOneAndUpdate({_id: id, user: userId}, {completed}, {
        new: true
    })
}

exports.allTodoUpdate = function (userId) {
   return TodoModel.updateMany({user: userId}, {completed: true})
}

exports.todoDelete = function (userId, id) {
     return TodoModel.deleteOne({_id: id, user: userId});
}

exports.allTodoDelete = function (userId, completed) {
    return TodoModel.deleteMany({completed, user: userId});
}
