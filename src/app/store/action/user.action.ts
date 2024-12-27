import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../shared/models/user.model';

export const login = createAction('[Auth] login', props<{ user: IUser }>());

export const loginSuccess = createAction(
  '[Auth] login success',
  props<{ username: string; password: string }>()
);

export const loginFailure = createAction(
  '[Auth] login failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] logout');

export const logoutSuccess = createAction('[Auth] logout success');

export const getStaffList = createAction('[Auth] get staff list');

export const getStaffListSuccess = createAction(
  '[Auth] get staff list successfull',
  props<{ staffs: IUser[] }>()
);

export const addUser = createAction(
  '[User] add user',
  props<{ user: IUser }>()
);
