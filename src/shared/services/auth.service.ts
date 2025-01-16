import { Injectable } from '@angular/core';
import {
  IUser,
  IUserAccount,
  IUserProfile,
  UserRole,
} from '../models/user.model';
import { BehaviorSubject, delay, filter, map, Observable, of } from 'rxjs';
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

  userProfileList$ = new BehaviorSubject<IUserProfile[]>([]);
  filteredUse$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private localService: LocalStorageService
  ) {}

  signin(email: string, password: string): Observable<IAuthResponse> {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.httpClient.post<IAuthResponse>(authUrl, data);
  }

  getUserProfile(id: string): Observable<IUser> {
    // const idToken = this.localService.getItem('idToken');
    // const queryParams = new HttpParams().set('auth', idToken);
    const url = `${userUrl}/${id}.json`;
    return this.httpClient.get<IUser>(url);
  }

  // isSignin() {
  //   const idToken;
  // }

  // signin(username: string, password: string): Observable<IUser | undefined> {
  //   //
  // profile: IUserProfile[] = this.httpClient.get(this.userUrl);

  //   const account = this.usersAccountList.find(
  //     (user) => user.username === username && user.password === password
  //   );

  //   if (account) {
  //     this.fetchUserInfo();

  //     this.getStaffs(account.role, account.username)
  //       .pipe(
  //         map((staffs) => {
  //           const filteredStaffs =
  //             account.role == UserRole.Admin
  //               ? staffs.filter((staff) => staff.username !== account.username)
  //               : staffs;

  //           const staffList: IUser[] = filteredStaffs
  //             .map((staffInfo) => {
  //               const staffAccount = this.usersAccountList.find(
  //                 (acc) => acc.username === staffInfo.username
  //               );
  //               if (staffAccount) {
  //                 return {
  //                   account: staffAccount,
  //                   profile: staffInfo,
  //                 };
  //               }
  //               return undefined;
  //             })
  //             .filter((staff): staff is IUser => staff !== undefined);

  //           this.filteredInfo$.next(staffList);

  //           this.store.dispatch(
  //             UserAction.getStaffListSuccess({
  //               staffs: staffList,
  //             })
  //           );

  //           if (staffList.length > 0) {
  //             this.filteredInfo$.next(staffList);
  //           }
  //         })
  //       )
  //       .subscribe();

  //     this.store.dispatch(
  //       UserAction.getStaffListSuccess({
  //         staffs: this.filteredInfo$.getValue(),
  //       })
  //     );

  //     return this.getUserInfo(account.username).pipe(
  //       map((profile) => {
  //         if (profile) {
  //           const user: IUser = {
  //             profile,
  //             account,
  //           };
  //           return user;
  //         } else {
  //           return undefined;
  //         }
  //       })
  //     );
  //   }

  //   return of(undefined);
  // }

  // fetchUserInfo(): void {
  //   this.httpClient.get<IUserProfile[]>(this.userUrl).subscribe((profile) => {
  //     this.userInfoList$.next(profile);
  //   });
  // }

  // getUserInfo(username: string): Observable<IUserProfile | null> {
  //   return this.userInfoList$.pipe(
  //     map((users) => {
  //       const profile = users.find((user) => user.username === username);
  //       return profile || null;
  //     })
  //   );
  // }

  // getStaffs(role: UserRole, username: string): Observable<IUserProfile[]> {
  //   switch (role) {
  //     case UserRole.Admin:
  //       return this.userInfoList$;

  //     case UserRole.Manager:
  //       const staffList = this.usersAccountList.filter(
  //         (user) => user.role === UserRole.Staff
  //       );

  //       return this.userInfoList$.pipe(
  //         map((userInfos) =>
  //           userInfos.filter((profile) =>
  //             staffList.some((staff) => staff.username == profile.username)
  //           )
  //         )
  //       );
  //     default:
  //       return of([]);
  //   }
  // }

  // checkUserNameExits(username: string) {
  //   return of(
  //     this.usersAccountList.some((user) => user.username === username)
  //   ).pipe(delay(1000));
  // }
}
