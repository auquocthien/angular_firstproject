import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../../shared/models/user.model';
import { Todo } from '../../../todo/models/todo.model';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AppStore from '../../../../store/reducer';
import { filter, map } from 'rxjs';
import { HighlightSubtextDirective } from '../../../../../shared/directives/highlight-subtext.directive';

@Component({
  selector: 'app-search-result-item',
  imports: [NgIf, HighlightSubtextDirective],
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.scss',
})
export class SearchResultItemComponent implements OnInit {
  @Input() data: IUser | Todo;
  @Input() searchText: string;
  title: string = '';
  asignFor: number = 0;
  owner: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.isUser(this.data)) {
      this.title = this.data.userAccount.username;
    }

    if (this.isTodo(this.data)) {
      this.title = this.data.title;
      this.asignFor = this.data.userId;

      this.store
        .select(AppStore.selectStaff)
        .pipe(
          map((users) => {
            return Object.values(users).filter(
              (user) => user.userAccount.userId == this.asignFor
            );
          })
        )
        .subscribe((user) => {
          console.log(user);
          this.owner = user.at(0).userAccount.username ?? 'unknown';
        });
    }
  }

  isUser(data: any): data is IUser {
    return data && 'userInfo' in data && 'userAccount' in data;
  }

  isTodo(data: any): data is Todo {
    return data && 'title' in data && 'completed' in data;
  }
}
