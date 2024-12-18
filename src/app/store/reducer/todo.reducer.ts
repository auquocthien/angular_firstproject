import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../components/todo/models/todo.model';
import * as TodoAction from '../action/todo.action';

export interface State {
  todo: Todo[];
  loaded: boolean;
}

export const initialTodoState: State = {
  todo: [],
  loaded: false,
};

export const todoReducers = createReducer(
  initialTodoState,
  on(TodoAction.addTodo, (state, { todo }) => ({
    ...state,
    todo: [...state.todo, todo],
  })),

  on(TodoAction.loadTodoSuccessfully, (state, { todos }) => ({
    ...state,
    loaded: true,
    todo: [...state.todo, ...todos],
  })),

  on(TodoAction.loadTodoFailure, (state, {}) => ({
    ...state,
    loaded: false,
  })),

  on(TodoAction.deleteTodo, (state, { id }) => ({
    ...state,
    todo: [...state.todo.filter((todo) => todo.id != id)],
  })),

  on(TodoAction.editTodo, (state, { id, title }) => ({
    ...state,
    todo: state.todo.map((todo) => {
      if (todo.id == id) {
        return { ...todo, title };
      }
      return todo;
    }),
  })),

  on(TodoAction.toggleCompleteStatus, (state, { id }) => ({
    ...state,
    todo: [
      ...state.todo.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      }),
    ],
  }))
);

export const selectTodo = (state: State) => state.todo;
export const selectLoaded = (state: State) => state.loaded;
