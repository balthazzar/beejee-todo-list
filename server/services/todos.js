const todoRepository = require('../repository/todos.js');

const getTodo = (id) => {
    return todoRepository.getTodo(id);
};

const getTodos = async (page = 0, column = 'status', direction = 'descending') => {
    return await todoRepository.getTodos(3, page * 3, column, direction) || [];
};

const createTodo = (todo) => {
    return todoRepository.createTodo(todo);
};

const updateTodo = (todo) => {
    return todoRepository.updateTodo(todo);
};

module.exports = {
    getTodo,
    getTodos,
    createTodo,
    updateTodo
};
