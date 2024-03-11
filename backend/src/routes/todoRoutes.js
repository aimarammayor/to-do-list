const express = require('express');
const router = express.Router();
const TodoService = require('../services/todoService');

router.get('/', TodoService.getAllTodos);
router.post('/add', TodoService.addTodo);
router.put('/update/:id', TodoService.updateTodo);
router.put('/delete/:id', TodoService.deleteTodo);

module.exports = router;