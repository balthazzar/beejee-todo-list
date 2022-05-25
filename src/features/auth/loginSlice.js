import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {fetchTodos} from "../todos/todosSlice";

export const login = createAsyncThunk('auth/login', async credentials => {
    const result = await axios.post('/auth/login', credentials);
    return result.data;
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
    const result = await axios.post('/auth/check');
    return result.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await axios.post('/auth/logout');
});

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        credentials: {
            username: '',
            password: ''
        },
        status: 'idle',
        user: {
            name: ''
        }
    },
    reducers: {
        logout(state) {
            state.todo = Object.assign({}, state.todo, payload);
        },
        loginInputChanged(state, { payload }) {
            state.credentials = Object.assign({}, state.credentials, payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.user = payload;
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.user = payload;
            })
            .addCase(logout.fulfilled, state => {
                state.status = 'idle';
                state.user = {
                    name: ''
                };
            });
    }
});

export const { loginInputChanged } = loginSlice.actions;

export default loginSlice.reducer;
