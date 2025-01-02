import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { PageNotFoundComponent } from '../shared/components/notfound/page-not-found/page-not-found.component';
import { ImagesComponent } from './components/images/images.component';
// import { addtocartGuard } from '../shared/guard/addtocart.guard';
import { SigninComponent } from './components/signin/signin.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home component' },
  { path: '', component: SigninComponent, title: 'User component' },
  { path: 'todo/:id', component: TodoComponent, title: 'Todo Component' },
  {
    path: 'images',
    loadChildren: () =>
      import('../app/components/images/image.routes').then((m) => m.route),
  },
  { path: '**', component: PageNotFoundComponent },
];
