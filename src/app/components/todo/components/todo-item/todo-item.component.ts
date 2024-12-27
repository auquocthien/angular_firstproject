import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { HightlightCompleteTodoDirective } from '../../directives/hightlight-complete-todo.directive';
import { FirstLetterUppercasePipe } from '../../../../../shared/pipes/first-letter-uppercase.pipe';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { Store } from '@ngrx/store';
import * as TodoAction from '../../../../store/action/todo.action';
import * as AppStore from '../../../../store/reducer';
import { Todo } from '../../models/todo.model';
@Component({
  selector: 'app-todo-item',
  imports: [
    NgStyle,
    HightlightCompleteTodoDirective,
    FirstLetterUppercasePipe,
    EditTodoComponent,
    NgIf,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  editText = '';
  completeCount = 0;
  editAt = 0;

  @Input() todo: Todo;
  @Input() index: number;

  @Input() showCompleteCol: boolean = true;

  constructor(private store: Store) {}

  editTodo(todoId: number): void {
    if (todoId === this.editAt) {
      this.editAt = 0;

      if (this.editText !== '') {
        this.store.dispatch(
          TodoAction.editTodo({
            id: todoId,
            title: this.editText,
          })
        );
      }
      // this.filteredTodos = [...this.todos];
      this.editText = '';
    } else {
      this.editAt = todoId;
    }
  }

  isEdit(todoId: number): boolean {
    return todoId === this.editAt;
  }

  handleEdit(todo: string): void {
    this.editText = todo;
  }

  deleteTodo(todoId: number): void {
    this.store.dispatch(TodoAction.deleteTodo({ id: todoId }));
  }

  toggleTodoCompletion(todoId: number): void {
    this.store.dispatch(TodoAction.toggleCompleteStatus({ id: todoId }));
    // this.updateCompleteCount();
  }
}
