import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  if (!authUser || !authUser.isAuthenticated) {
    return []; // If no user is logged in, return an empty task list
  }
  return (
    JSON.parse(localStorage.getItem(`todoList_${authUser.username}`)) || []
  );
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    filterStatus: 'all',
    todoList: getInitialTodo(),
  },
  reducers: {
    addTodo: (state, action) => {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      if (!authUser) return;

      state.todoList.push(action.payload);
      localStorage.setItem(
        `todoList_${authUser.username}`,
        JSON.stringify(state.todoList)
      );
    },
    updateTodo: (state, action) => {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      if (!authUser) return;

      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
      localStorage.setItem(
        `todoList_${authUser.username}`,
        JSON.stringify(state.todoList)
      );
    },
    deleteTodo: (state, action) => {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      if (!authUser) return;

      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem(
        `todoList_${authUser.username}`,
        JSON.stringify(state.todoList)
      );
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    loadUserTodos: (state) => {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      if (authUser) {
        state.todoList =
          JSON.parse(localStorage.getItem(`todoList_${authUser.username}`)) ||
          [];
      }
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  updateFilterStatus,
  loadUserTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
