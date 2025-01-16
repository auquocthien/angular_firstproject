import { NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FirstLetterUppercasePipe } from '../../../../../shared/pipes/first-letter-uppercase.pipe';
import { Store } from '@ngrx/store';
import * as TodoAction from '../../../../store/action/todo.action';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { HighlighCompleteTodoDirective } from '../../directives/highlight-complete-todo.directive';
@Component({
  selector: 'app-todo-item',
  imports: [
    NgStyle,
    FirstLetterUppercasePipe,
    NgIf,
    FormsModule,
    HighlighCompleteTodoDirective,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnInit {
  editText = '';
  completeCount = 0;
  editAt: string = '';

  @Input() todo: Todo;
  @Input() index: number;

  @Input() showCompleteCol: boolean = true;

  constructor(private store: Store, private todoService: TodoService) {}

  ngOnInit(): void {
    this.editText = this.todo.title;
  }

  onEditTodo(todoId: string): void {
    if (todoId === this.editAt) {
      this.editAt = '';

      if (this.editText !== '') {
        this.store.dispatch(
          TodoAction.editTodo({
            id: todoId,
            title: this.editText,
          })
        );

        this.todoService
          .updateTodo(todoId, { title: this.editText })
          .subscribe();
      }
      // this.filteredTodos = [...this.todos];
      this.editText = '';
    } else {
      this.editAt = todoId;
    }
  }

  isEdit(todoId: string): boolean {
    return todoId === this.editAt;
  }

  handleEdit(todo: string): void {
    this.editText = todo;
  }

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(todoId).subscribe();
    this.store.dispatch(TodoAction.deleteTodo({ id: todoId }));
  }

  toggleTodoCompletion(todoId: string): void {
    this.store.dispatch(TodoAction.toggleCompleteStatus({ id: todoId }));
    this.todoService
      .updateTodo(todoId, { completed: !this.todo.completed })
      .subscribe();
    // this.updateCompleteCount();
  }
}
