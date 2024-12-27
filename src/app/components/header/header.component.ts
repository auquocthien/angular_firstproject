import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/reducer';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, NgIf, RouterLinkActive, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user$: Observable<IUser | null>;

  constructor(store: Store) {
    this.user$ = store.select(selectUser);
  }
}
