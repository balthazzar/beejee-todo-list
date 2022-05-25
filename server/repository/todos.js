const pg = require('pg');

const pool = new pg.Pool();

const getTodos = async (limit, offset, column, direction) => {
    let result;

    let sqlDirection;
    let sqlColumn = column !== 'status' && column !== 'username' && column !== 'email' ? 'status' : column;

    switch (direction)  {
        case 'ascending':
            sqlDirection = 'ASC';
            break;
        case 'descending':
            sqlDirection = 'DESC';
            break;
        default:
            sqlDirection = 'DESC';
    }

    try {
        result = await pool.query(`SELECT COUNT(*) OVER() totalRows, * FROM todos ORDER BY ${sqlColumn} ${sqlDirection} LIMIT $1::numeric OFFSET $2::numeric`, [limit, offset]);
    } catch (error) {
        console.log(error.message);
    }

    return result && result.rows;
};

const getTodo = async (id) => {
    let result;

    try {
        result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    } catch (error) {
        console.log(error.message);
    }

    return result && result.rows[0];
};

const createTodo = async todo => {
    try {
        await pool.query('INSERT INTO todos (username, email, content, status) VALUES ($1, $2, $3, $4)', [todo.username, todo.email, todo.content, false]);
    } catch (error) {
        console.log(error.message);
    }
};

const updateTodo = async todo => {
    try {
        await pool.query('UPDATE todos SET email = $1, content = $2, status = $3 WHERE id = $4', [todo.email, todo.content, todo.status, todo.id]);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getTodo,
    getTodos,
    createTodo,
    updateTodo
};
