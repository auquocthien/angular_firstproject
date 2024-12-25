import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../../user/models/user.model';
import { Todo } from '../../../todo/models/todo.model';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import * as AppStore from '../../../../store/reducer';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';

@Component({
  selector: 'app-search-popup',
  imports: [NgIf, SearchResultItemComponent, NgFor, NgStyle],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchPopupComponent implements OnChanges, OnDestroy {
  @Input() isVisible = false;
  @Input() searchText = '';

  userMatches: IUser[] = [];
  todoMatches: Todo[] = [];

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((text) => {
        this.search(text);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText'] && this.searchText.length >= 4) {
      this.searchSubject.next(this.searchText);
    }
  }

  search(text: string) {
    this.store
      .select(AppStore.selectStaff)
      .pipe(
        map((staffs: IUser[]) => {
          return Object.values(staffs).filter((staff) =>
            staff.userInfo.username.toLowerCase().includes(text.toLowerCase())
          );
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.userMatches = data;
      });

    this.store
      .select(AppStore.selectTodo)
      .pipe(
        map((todos) => {
          return todos
            .filter((todo) =>
              todo.title.toLowerCase().includes(text.toLowerCase())
            )
            .slice(0, 10);
        })
      )
      .subscribe((todo) => {
        console.log(todo);
        return (this.todoMatches = todo);
      });
  }

  setHeightSearchResult() {
    return {
      height:
        this.userMatches.length > 0 || this.todoMatches.length > 0
          ? '400px'
          : 'auto',
    };
  }
}
