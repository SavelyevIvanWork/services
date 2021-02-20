const todo = require('../models/todoModel');

exports.todoGet = async function (req, res) {
    const todoList = await todo.todoGet(req.userId);
    res.json(todoList);
};

exports.todoCreate = async function (req, res) {
    const newTodo = await todo.todoCreate(req.userId,req.body);
    res.json(newTodo);
}

exports.todoUpdate = async function (req, res) {
        const todoUp = await todo.todoUpdate(req.userId, req.body.id, req.body.completed);
        res.json(todoUp);
}

exports.allTodoUpdate = async function (req, res) {
    try {
        const allTodoCompleted = await todo.allTodoUpdate(req.userId);
        res.json(allTodoCompleted);
    } catch (e) {
        res.status(400).json({message: 'ошибка сервера'})
    }

}

exports.todoDelete = async function (req, res) {
    await todo.todoDelete(req.userId, req.params.id);
    res.send("task has been remove");
}

exports.allTodoDelete = async function (req, res) {
    await todo.allTodoDelete(req.userId, req.body.completed);
    res.send("tasks has been remove");
}


