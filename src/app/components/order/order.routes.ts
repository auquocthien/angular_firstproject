import { Routes } from '@angular/router';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { OrderComponent } from './order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

export const route: Routes = [
  {
    path: 'review',
    component: OrderReviewComponent,
  },
  {
    path: '',
    component: OrderComponent,
  },
  { path: 'detail/:id', component: OrderDetailComponent },
];
