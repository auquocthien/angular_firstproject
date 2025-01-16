import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { AuthService } from '../shared/services/auth.service';
import { Store } from '@ngrx/store';
import * as UserAction from '../app/store/action/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private localService: LocalStorageService,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
