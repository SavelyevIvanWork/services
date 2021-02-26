const todo = require('../models/todoModel');

exports.todoGet = async function (req, res) {
    const todoList = await todo.todoGet(req.userId);
    res.json(todoList);
};

exports.todoCreate = async function (req, res) {
    const newTodo = await todo.todoCreate(req.userId, req.body);
    console.log(newTodo)
    res.json(newTodo);
}

exports.todoUpdate = async function (req, res) {
    try {
        const task = await todo.taskSearch(req.userId, req.body.id)
        console.log(task)
        if (!task) {
            res.status(410).json({message: `Запись не найдена!`})
        } else {
            const todoUp = await todo.todoUpdate(req.userId, req.body.id, req.body.completed);
            res.json(todoUp);
        }
    } catch (err) {
        console.log(err)
        res.status(410).json({message: 'Запись не найдена!'})
    }
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
    const removeTodo = await todo.todoDelete(req.userId, req.params.id);
    res.json(removeTodo);
}

exports.allTodoDelete = async function (req, res) {
    await todo.allTodoDelete(req.userId);
    res.send("tasks has been remove");
}


