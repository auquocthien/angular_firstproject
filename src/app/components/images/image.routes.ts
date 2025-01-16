import { Routes } from '@angular/router';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { ImagesComponent } from './images.component';
import { AuthGuard } from '../../../shared/guard/auth.guard';

export const route: Routes = [
  {
    path: '',
    component: ImagesComponent,
    canActivate: [AuthGuard],
    // children: [{ path: 'image/:id', component: ImageDetailComponent }],
  },

  { path: 'image/:id', component: ImageDetailComponent },
];
