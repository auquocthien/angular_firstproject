import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';

export const authorizationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const localService = inject(LocalStorageService);
  const token = localService.getItem('idToken');

  console.log('interceptor called');

  if (token) {
    if (!req.params.has('auth')) {
      req = req.clone({
        setParams: { auth: token },
      });
    }
  }

  return next(req);
};
