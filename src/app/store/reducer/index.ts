import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuthReducer from './user.reducer';
import * as fromTodoReducer from './todo.reducer';

export interface AppState {
  user: fromAuthReducer.State;
  todo: fromTodoReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromAuthReducer.authReducer,
  todo: fromTodoReducer.todoReducers,
};

export const selectUserState =
  createFeatureSelector<fromAuthReducer.State>('user');
export const selectUser = createSelector(
  selectUserState,
  fromAuthReducer.selectUser
);
export const selectStaff = createSelector(
  selectUserState,
  fromAuthReducer.selectStaff
);

export const selectTodoState =
  createFeatureSelector<fromTodoReducer.State>('todo');
export const selectTodo = createSelector(
  selectTodoState,
  fromTodoReducer.selectTodo
);
export const selectTodoLoaded = createSelector(
  selectTodoState,
  fromTodoReducer.selectLoaded
);
