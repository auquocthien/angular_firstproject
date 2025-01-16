import { Todo } from '../../app/components/todo/models/todo.model';
import { IUser } from './user.model';

export interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: string;
}

export interface IFirebaseResponseBody {
  [key: string]: IUser | Todo;
}
