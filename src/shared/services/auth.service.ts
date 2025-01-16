import { Injectable } from '@angular/core';
import {
  IUser,
  IUserAccount,
  IUserProfile,
  UserRole,
} from '../models/user.model';
import {
  BehaviorSubject,
  catchError,
  delay,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as UserAction from '../../app/store/action/user.action';
import { IAuthResponse } from '../models/auth.model';
import { LocalStorageService } from './local-storage.service';
import { authUrl, userUrl } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users$: Observable<IUser>[] = [];
  isAuth: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private localService: LocalStorageService
  ) {}

  set auth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  signin(email: string, password: string): Observable<IAuthResponse> {
    const data = { email: email, password: password, returnSecureToken: true };

    return this.httpClient.post<IAuthResponse>(authUrl, data).pipe(
      tap((res) => {
        this.saveAuthData(res);
        return this.getUserProfile(res.localId);
      }),

      catchError((error) => {
        console.error('Sign in failed:', error);
        return throwError(() => error);
      })
    );
  }

  signout() {
    this.localService.clear();
  }

  private saveAuthData(res: any): void {
    this.localService.setItem('idToken', res.idToken);
    this.localService.setItem('uuid', res.localId);
    this.localService.setItem('refreshToken', res.refreshToken);
    this.localService.setItem('expiresIn', res.expiresIn);
    this.isAuth = true;
  }

  getUserProfile(id: string): Observable<IUser> {
    const url = `${userUrl}/${id}.json`;
    return this.httpClient.get<IUser>(url);
  }
}
