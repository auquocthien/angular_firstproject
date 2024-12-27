import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Todo } from './models/todo.model';
import { IUser } from '../../../shared/models/user.model';
import { AppState } from '../../store/reducer';
import * as AppStore from '../../store/reducer';
import * as TodoAction from '../../store/action/todo.action';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { HightlightCompleteTodoDirective } from './directives/hightlight-complete-todo.directive';

import { NgFor, NgIf } from '@angular/common';
import { ProgressBarComponent } from './components/progress/progress-bar/progress-bar.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
    AddTodoComponent,
    ProgressBarComponent,
    NgIf,
    NgFor,
    TodoItemComponent,
    TodoFilterComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnChanges, OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filterText: string = 'all';
  completeCount = 0;

  @Input() showCompleteCol: boolean = true;

  @Input() userId: number = 0;
  user$: Observable<IUser | null>;
  todo$!: Observable<Todo[]>;

  @ViewChild(HightlightCompleteTodoDirective)
  highlightDirective: HightlightCompleteTodoDirective;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.user$ = this.store.select(AppStore.selectUser);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      this.loadTodos();
      this.showCompleteCol = false;
    }
    console.log();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      if (param.get('id') != null) {
        this.userId =
          this.userId != undefined
            ? this.userId
            : parseInt(param.get('id')!, 10);
        this.showCompleteCol = true;
      }
    });
    this.loadTodos();
  }

  loadTodos() {
    this.store
      .select(AppStore.selectTodoLoaded)
      .pipe(
        take(1),
        tap((loaded) => {
          this.store.dispatch(TodoAction.loadTodos({ loaded }));
        }),
        switchMap(() => this.store.select(AppStore.selectTodo))
      )
      .subscribe((todos) => {
        this.todos = todos;
        this.filteredTodos = [...this.todos];
        this.filterTodoByUserId(this.userId);
        this.updateCompleteCount();
      });
  }

  updateCompleteCount() {
    this.completeCount = this.filteredTodos.filter(
      (todo) => todo.completed === true
    ).length;
  }

  filterTodoByStatus(option: string): void {
    if (option === 'all') {
      this.todos = [...this.filteredTodos];
    } else {
      const isCompleted = option === 'true';
      this.todos = this.filteredTodos.filter(
        (todo) => todo.completed === isCompleted
      );
    }
  }

  filterTodoByUserId(userId: number) {
    this.todos = this.todos.filter((todo) => todo.userId === userId);
    this.filteredTodos = [...this.todos];
  }

  addTodo(todoItem: string): void {
    const newTodo: Todo = {
      userId: this.userId,
      id: this.todos.length + 1,
      title: todoItem,
      completed: false,
    };
    this.store.dispatch(TodoAction.addTodo({ todo: newTodo }));
  }

  showCompletColumn(): boolean {
    return this.showCompleteCol === undefined;
  }
}
