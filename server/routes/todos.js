const express = require('express');

const todoService = require('../services/todos.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const { page, column, direction } = req.query;
    res.json(await todoService.getTodos(page, column, direction));
});

router.get('/:id', async (req, res) => {
    const todo = await todoService.getTodo(req.params.id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).end();
    }
});

router.post('/', async (req, res) => {
    await todoService.createTodo(req.body.todo);
    res.end();
});

router.put('/', (req, res, next) => {
    if (!req.user) {
        return res.status(401).end();
    }

    next();
}, async (req, res) => {
    await todoService.updateTodo(req.body.todo);
    res.end();
});

module.exports = router;
