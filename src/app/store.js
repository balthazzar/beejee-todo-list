import { configureStore } from '@reduxjs/toolkit';

import todosSlice from '../features/todos/todosSlice';
import loginSlice from '../features/auth/loginSlice';

export default configureStore({
    reducer: {
        todos: todosSlice,
        auth: loginSlice
    },
});
