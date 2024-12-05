import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      userId: 1,
      username: 'john_doe',
      password: 'password123',
    },
    {
      userId: 2,
      username: 'jane_smith',
      password: 'securepass',
    },
    {
      userId: 3,
      username: 'michael_brown',
      password: 'mike2024',
    },
    {
      userId: 4,
      username: 'emily_white',
      password: 'emilyrocks',
    },
    {
      userId: 5,
      username: 'chris_black',
      password: 'blackpanther',
    },
  ];
  constructor() {}

  login(username: string, password: string): User | undefined {
    const index = this.users.findIndex(
      (user) => user.username == username && user.password == password
    );

    if (index != -1) {
      console.log('login successfully');
      return this.users.at(index);
    } else {
      console.log('cannot find account');
      return undefined;
    }
  }
}
