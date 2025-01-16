import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { PageNotFoundComponent } from '../shared/components/notfound/page-not-found/page-not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from '../shared/guard/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home component' },
  { path: '', component: SigninComponent, title: 'User component' },
  {
    path: 'todo/:id',
    component: TodoComponent,
    title: 'Todo Component',
    canActivate: [AuthGuard],
  },
  {
    path: 'images',
    loadChildren: () =>
      import('../app/components/images/image.routes').then((m) => m.route),
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'order',
    loadChildren: () =>
      import('../app/components/order/order.routes').then((m) => m.route),
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
