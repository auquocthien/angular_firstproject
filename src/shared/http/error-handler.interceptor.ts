import {
  HttpErrorResponse,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToasterService } from '../services/toaster.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const toaster = inject(ToasterService);

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred.';
        if (error.error && error.error.error) {
          errorMessage = handleErrorMessage(error.error.error.message);
        }

        toaster.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      }

      return throwError(() => error);
    })
  );
};

const handleErrorMessage: any = (errorCode: string): string => {
  switch (errorCode) {
    case 'EMAIL_EXISTS':
      return 'This email address is already in use.';
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Invalid username or password';
    case 'USER_DISABLED':
      return 'The user account has been disabled by an administrator.';
    default:
      return 'An error occurred. Please try again.';
  }
};
