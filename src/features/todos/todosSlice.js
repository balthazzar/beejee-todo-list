import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async page => {
    const response = await axios.get('/api/todos', { params: { page } });
    return { page, todos: response.data };
});

export const fetchTodosSorted = createAsyncThunk('todos/fetchTodosSorted', async ({ page, column, direction }) => {
    const response = await axios.get('/api/todos', { params: { page, column, direction } });
    return { page, column, direction, todos: response.data };
});

export const addTodo = createAsyncThunk('todos/addTodo', async todo => {
    await axios.post('/api/todos', { todo });
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async todo => {
    await axios.put('/api/todos', { data: { todo } });
    return { todo };
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        entities: [],
        page: 0,
        status: 'idle',
        totalPages: 0,
        modalOpen: false,
        todo: {
            username: '',
            email: '',
            content: ''
        },
        sort: {
            status: 'descending'
        }
    },
    reducers: {
        openModal(state, { payload }) {
            state.modalOpen = payload;
        },
        newInputChanged(state, { payload }) {
            state.todo = Object.assign({}, state.todo, payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.entities = payload.todos;

                state.page = payload.page;
                state.totalPages = payload.todos && payload.todos[0] && Math.ceil(payload.todos[0].totalrows / 3);
            })
            .addCase(fetchTodosSorted.fulfilled, (state, { payload }) => {
                state.entities = payload.todos;

                state.page = payload.page;
                state.totalPages = payload.todos && payload.todos[0] && Math.ceil(payload.todos[0].totalrows / 3);
                state.sort = {
                    [payload.column]: payload.direction
                };
            })
            .addCase(addTodo.fulfilled, state => {
                state.entities = [];
                state.status = 'idle';
                state.totalPages = 0;
                state.todo = {
                    username: '',
                    email: '',
                    content: ''
                };
            })
            .addCase(updateTodo.fulfilled, (state, { payload }) => {
                const existingTodo = state.entities.find(entity => entity.id === payload.todo.id);

                if (existingTodo) {
                    existingTodo.content = payload.todo.content;
                    existingTodo.status = payload.todo.status;
                }
            });
    }
});

export const { openModal, newInputChanged } = todosSlice.actions;

export default todosSlice.reducer;
