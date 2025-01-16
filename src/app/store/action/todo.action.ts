import { createAction, props } from '@ngrx/store';
import { Todo } from '../../components/todo/models/todo.model';

export const addTodo = createAction('[Todo] add todo', props<{ todo: Todo }>());

export const loadTodos = createAction(
  '[Todo] load to',
  props<{ loaded?: boolean }>()
);

export const loadTodoSuccessfully = createAction(
  '[Todo] add todos successfully',
  props<{ todos: Todo[] }>()
);

export const loadTodoFailure = createAction('[Todo] load todo fail');

export const deleteTodo = createAction(
  '[Todo] delete todo',
  props<{ id: string }>()
);

export const editTodo = createAction(
  '[Todo] edit todo',
  props<{ id: string; title: string }>()
);

export const toggleCompleteStatus = createAction(
  '[Todo] toggle complete status',
  props<{ id: string }>()
);
