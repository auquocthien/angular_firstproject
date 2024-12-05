import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home component' },
  { path: 'user', component: UserComponent, title: 'User component' },
  { path: 'todo/:id', component: TodoComponent, title: 'Todo Component' },
];
