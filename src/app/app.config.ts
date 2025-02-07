import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers } from './store/reducer/index';
import { provideEffects } from '@ngrx/effects';
import { TodoEffect } from './store/effect/todo.effect';
import { ImageEffect } from './store/effect/image.effect';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authorizationInterceptor } from '../shared/http/authorization.interceptor';
import { errorHandlerInterceptor } from '../shared/http/error-handler.interceptor';
// import { provideDatatable } from 'ngx-datatable';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authorizationInterceptor, errorHandlerInterceptor])
    ),
    provideStore(reducers),
    provideZoneChangeDetection(),
    provideStoreDevtools({ maxAge: 25 }),
    provideEffects([TodoEffect, ImageEffect]),
    provideAnimations(),
    provideToastr(),
    // provideDatatable(),
  ],
};
