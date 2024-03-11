const TodoModel = require('../models/Todo');

exports.getAllTodos = (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.addTodo = (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    TodoModel.findByIdAndUpdate(
        { _id: id },
        { done: done },
        { new: true }
    ).then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};