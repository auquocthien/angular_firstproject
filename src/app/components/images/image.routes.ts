import { Routes } from '@angular/router';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { ImagesComponent } from './images.component';

export const route: Routes = [
  {
    path: '',
    component: ImagesComponent,
    // children: [{ path: 'image/:id', component: ImageDetailComponent }],
  },

  { path: 'image/:id', component: ImageDetailComponent },
];
