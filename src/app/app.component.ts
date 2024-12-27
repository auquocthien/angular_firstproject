import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserComponent } from './components/signin/signin.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {}
