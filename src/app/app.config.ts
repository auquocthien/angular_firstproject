import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers } from './store/reducer/index';
import { provideEffects } from '@ngrx/effects';
import { TodoEffect } from './store/effect/todo.effect';
import { ImageEffect } from './store/effect/image.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore(reducers),
    provideZoneChangeDetection(),
    provideStoreDevtools({ maxAge: 25 }),
    provideEffects([TodoEffect, ImageEffect]),
  ],
};
