import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../action/user.action';
import { IUser } from '../../components/user/models/user.model';

export const featureKey = 'userReducer';

export interface State {
  loading: boolean;
  user: IUser | null;
  staff: IUser[];
}

export const initialAuthState: State = {
  loading: false,
  user: null,
  staff: [],
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { user }) => ({
    ...state,
    user: { ...user },
  })),
  on(AuthActions.logout, () => initialAuthState),
  on(AuthActions.getStaffListSuccess, (state, { staffs }) => ({
    ...state,
    staff: { ...staffs },
  })),
  on(AuthActions.addUser, (state, { user }) => ({
    ...state,
    user: { ...user },
  }))
);

export const selectUser = (state: State) => state.user;
export const selectStaff = (state: State) => state.staff;
