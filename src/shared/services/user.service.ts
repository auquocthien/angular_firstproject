import { Injectable } from '@angular/core';
import { IUser, IUserAccount, IUserInfo, UserRole } from '../models/user.model';
import { BehaviorSubject, delay, filter, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as UserAction from '../../app/store/action/user.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$: Observable<IUser>[] = [];

  userUrl: string = 'https://jsonplaceholder.typicode.com/users';
  userInfoList$ = new BehaviorSubject<IUserInfo[]>([]);
  filteredInfo$ = new BehaviorSubject<IUser[]>([]);
  usersAccountList: IUserAccount[] = [
    {
      userId: 1,
      username: 'Bret',
      password: 'password123',
      role: UserRole.Admin,
    },
    {
      userId: 2,
      username: 'Antonette',
      password: 'securepass',
      role: UserRole.Manager,
    },
    {
      userId: 3,
      username: 'Samantha',
      password: 'mike2024',
      role: UserRole.Staff,
    },
    {
      userId: 4,
      username: 'Karianne',
      password: 'emilyrocks',
      role: UserRole.Staff,
    },
    {
      userId: 5,
      username: 'Kamren',
      password: 'blackpanther',
      role: UserRole.Staff,
    },
  ];

  constructor(private httpClient: HttpClient, private store: Store) {}

  signin(username: string, password: string): Observable<IUser | undefined> {
    // const userInfo: IUserInfo[] = this.httpClient.get(this.userUrl);

    const userAccount = this.usersAccountList.find(
      (user) => user.username === username && user.password === password
    );

    if (userAccount) {
      this.fetchUserInfo();

      this.getStaffs(userAccount.role, userAccount.username)
        .pipe(
          map((staffs) => {
            const filteredStaffs =
              userAccount.role == UserRole.Admin
                ? staffs.filter(
                    (staff) => staff.username !== userAccount.username
                  )
                : staffs;

            const staffList: IUser[] = filteredStaffs
              .map((staffInfo) => {
                const staffAccount = this.usersAccountList.find(
                  (acc) => acc.username === staffInfo.username
                );
                if (staffAccount) {
                  return {
                    userAccount: staffAccount,
                    userInfo: staffInfo,
                  };
                }
                return undefined;
              })
              .filter((staff): staff is IUser => staff !== undefined);

            this.filteredInfo$.next(staffList);

            this.store.dispatch(
              UserAction.getStaffListSuccess({
                staffs: staffList,
              })
            );

            if (staffList.length > 0) {
              this.filteredInfo$.next(staffList);
            }
          })
        )
        .subscribe();

      this.store.dispatch(
        UserAction.getStaffListSuccess({
          staffs: this.filteredInfo$.getValue(),
        })
      );

      return this.getUserInfo(userAccount.username).pipe(
        map((userInfo) => {
          if (userInfo) {
            const user: IUser = {
              userInfo,
              userAccount,
            };
            return user;
          } else {
            return undefined;
          }
        })
      );
    }

    return of(undefined);
  }

  fetchUserInfo(): void {
    this.httpClient.get<IUserInfo[]>(this.userUrl).subscribe((userInfo) => {
      this.userInfoList$.next(userInfo);
    });
  }

  getUserInfo(username: string): Observable<IUserInfo | null> {
    return this.userInfoList$.pipe(
      map((users) => {
        const userInfo = users.find((user) => user.username === username);
        return userInfo || null;
      })
    );
  }

  getStaffs(role: UserRole, username: string): Observable<IUserInfo[]> {
    switch (role) {
      case UserRole.Admin:
        return this.userInfoList$;

      case UserRole.Manager:
        const staffList = this.usersAccountList.filter(
          (user) => user.role === UserRole.Staff
        );

        return this.userInfoList$.pipe(
          map((userInfos) =>
            userInfos.filter((userInfo) =>
              staffList.some((staff) => staff.username == userInfo.username)
            )
          )
        );
      default:
        return of([]);
    }
  }

  checkUserNameExits(username: string) {
    return of(
      this.usersAccountList.some((user) => user.username === username)
    ).pipe(delay(1000));
  }
}
