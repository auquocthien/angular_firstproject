import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/signin/signin.component';
import { TodoComponent } from './components/todo/todo.component';
import { PageNotFoundComponent } from '../shared/components/notfound/page-not-found/page-not-found.component';
import { ImagesComponent } from './components/images/images.component';
import { addtocartGuard } from '../shared/guard/addtocart.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home component' },
  { path: 'user', component: UserComponent, title: 'User component' },
  { path: 'todo/:id', component: TodoComponent, title: 'Todo Component' },
  {
    path: 'images',
    component: ImagesComponent,
    title: 'Image Component',
    canActivate: [addtocartGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
