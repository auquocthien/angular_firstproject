import { IUser } from '../models/user.model';

export const transformUserInfo = (data: IUser, localId: string): IUser => {
  return {
    profile: data.profile,
    account: { ...data.account, userId: localId },
  };
};
