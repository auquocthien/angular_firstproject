import { NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HighlighCompleteTodoDirective } from '../../directives/hightlight-complete-todo.directive';
import { FirstLetterUppercasePipe } from '../../../../../shared/pipes/first-letter-uppercase.pipe';
import { Store } from '@ngrx/store';
import * as TodoAction from '../../../../store/action/todo.action';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo-item',
  imports: [
    NgStyle,
    HighlighCompleteTodoDirective,
    FirstLetterUppercasePipe,
    NgIf,
    FormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnInit {
  editText = '';
  completeCount = 0;
  editAt = 0;

  @Input() todo: Todo;
  @Input() index: number;

  @Input() showCompleteCol: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.editText = this.todo.title;
  }

  onEditTodo(todoId: number): void {
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
