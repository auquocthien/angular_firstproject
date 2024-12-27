import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  filter,
  map,
  Observable,
  of,
  switchAll,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IUser } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import * as AppStore from '../../../../app/store/reducer';
import { AsyncPipe, DecimalPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Todo } from '../../../../app/components/todo/models/todo.model';

@Component({
  selector: 'app-profile-card',
  imports: [AsyncPipe, NgIf, NgFor, DecimalPipe, NgStyle],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  selectedUser = -1;

  @Output() sendUserId = new EventEmitter<number>();

  user$: Observable<IUser | null>;
  users$: Observable<IUser[]>;
  todos$: Observable<Todo[]>;

  constructor(private store: Store) {
    this.user$ = this.store.select(AppStore.selectUser);
    this.users$ = this.store
      .select(AppStore.selectStaff)
      .pipe(map((users) => Object.values(users)));
    this.todos$ = this.store.select(AppStore.selectTodo);
  }
  ngOnDestroy(): void {
    // if (this.todos$) {
    //   this.todos$.
    // }
  }
  ngOnInit(): void {
    this.users$.subscribe((user) => console.log(user));
  }

  trackByFn(index: number, item: IUser): number {
    return item.userAccount.userId; // Trả về 'key' của mỗi cặp key-value
  }

  getComppletePercent(userId: number) {
    var totalTodos = 0;
    var completed = 0;
    this.store
      .select(AppStore.selectTodo)
      .pipe(
        map((todos) => {
          const userTodos = todos.filter((todo) => todo.userId === userId);
          totalTodos = userTodos.length;
          completed = userTodos.filter((todo) => todo.completed == true).length;
        })
      )
      .subscribe();
    return (completed / totalTodos) * 100;
  }

  getCompletionColor(userId: number) {
    return {
      background:
        this.getComppletePercent(userId) > 50
          ? 'linear-gradient(#4facfe, #00f2fe)'
          : 'linear-gradient(#ff7f7f, #7fafff)',
    };
  }

  onSelectUser(userId: number): void {
    this.sendUserId.emit(userId);
  }
}
