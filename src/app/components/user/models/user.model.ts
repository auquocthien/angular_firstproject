export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IGeo {
  lat: number;
  long: number;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IUserInfo {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: IAddress;
  company: ICompany;
}

export enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Manager = 'manager',
}
export interface IUserAccount {
  userId: number;
  username: string;
  password: string;
  role: UserRole;
}

export interface IUser {
  userInfo: IUserInfo;
  userAccount: IUserAccount;
}
