import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TodoService } from '../../components/todo/services/todo.service';
import * as TodoAction from '../action/todo.action';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  noop,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTodoReducer from '../reducer/todo.reducer';

@Injectable()
export class TodoEffect {
  loadTodo$ = createEffect(
    (
      actions$ = inject(Actions),
      todoService = inject(TodoService),
      store = inject(Store)
    ) =>
      actions$.pipe(
        ofType(TodoAction.loadTodos),
        withLatestFrom(store.select(fromTodoReducer.selectTodo)),
        mergeMap(([{ loaded }]) => {
          if (loaded) {
            return of({ type: '[Todo] Load Todos Already Loaded' });
          }

          return todoService.getTodos().pipe(
            map((todos) => TodoAction.loadTodoSuccessfully({ todos })),
            catchError((error) => of(TodoAction.loadTodoFailure()))
          );
        })
      )
    // { functional: true }
  );
  constructor() {}
}
