import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, Observable, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Todo } from './models/todo.model';
import { IUser } from '../user/models/user.model';
import { AppState } from '../../store/reducer';
import * as AppStore from '../../store/reducer';
import * as TodoAction from '../../store/action/todo.action';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { HightlightCompleteTodoDirective } from './directives/hightlight-complete-todo.directive';
import { FirstLetterUppercasePipe } from '../../../shared/pipes/first-letter-uppercase/first-letter-uppercase.pipe';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { ProgressBarComponent } from './components/progress/progress-bar/progress-bar.component';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
    NgStyle,
    HightlightCompleteTodoDirective,
    FirstLetterUppercasePipe,
    AddTodoComponent,
    EditTodoComponent,
    ProgressBarComponent,
    NgIf,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnChanges, OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filterText: string = 'all';
  editText = '';
  completeCount = 0;
  editAt = 0;
  @Input() showCompleteCol: boolean = true;

  @Input() userId: number = 0;
  user$: Observable<IUser | null>;
  todo$!: Observable<Todo[]>;

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

  filterTodoByStatus(event: Event): void {
    const option = (event.target as HTMLInputElement).value;
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

  deleteTodo(todoId: number): void {
    this.store.dispatch(TodoAction.deleteTodo({ id: todoId }));
  }

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
      this.filteredTodos = [...this.todos];
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

  toggleTodoCompletion(todoId: number): void {
    // this.todos = this.todos.map((todo) =>
    //   todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    // );
    // this.filteredTodos = this.filteredTodos.map((todo) =>
    //   todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    // );
    this.store.dispatch(TodoAction.toggleCompleteStatus({ id: todoId }));
    this.updateCompleteCount();
  }

  showCompletColumn(): boolean {
    return this.showCompleteCol === undefined;
  }
}
