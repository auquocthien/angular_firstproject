import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IUser } from '../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/reducer';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    RouterLinkActive,
    SearchComponent,
    FontAwesomeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user$: Observable<IUser | null>;
  headerIcon = {
    cart: faCartArrowDown,
  };
  totalItemInCart: number;

  constructor(
    store: Store,
    private router: Router,
    private cartService: CartService
  ) {
    this.user$ = store.select(selectUser);
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.totalItemInCart = cart.items.length;
    });
  }

  onButtonClick(route: string) {
    this.router.navigate([route]);
  }
}
