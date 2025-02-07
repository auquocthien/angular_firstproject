import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/reducer';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart/services/cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    SearchComponent,
    FontAwesomeModule,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: IUser;
  headerIcon = {
    cart: faCartArrowDown,
  };
  totalItemInCart: number;
  isSignin: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.totalItemInCart = cart.items.length;
    });
    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        user = user;
        this.isSignin = !!user;
      }
    });
  }

  signout() {
    this.authService.signout();
    this.router.navigate(['']);
  }
}
