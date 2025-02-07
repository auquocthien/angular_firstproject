export interface ICompany {
  companyName: string;
  tagline: string;
  businessType: string;
}

export interface IGeoLocation {
  lat: number;
  long: number;
}
export enum AddressType {
  Home = 'home',
  Work = 'work',
  Billing = 'billing',
  Shipping = 'shipping',
  Other = 'other',
}
export interface IAddress {
  type: AddressType;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoLocation;
}

export interface IUserProfile {
  fullName: string;
  username: string;
  phone: string;
  address: IAddress;
}

export enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Manager = 'manager',
  Customer = 'customer',
}

export interface IUserAccount {
  userId: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface IUser {
  profile: IUserProfile;
  account: IUserAccount;
  manager?: IUser; // Optional field for the manager of the user
}

export interface IManager {
  id: number;
  name: string;
  department?: string;
  employees: IEmployee[];
}

export interface IEmployee {
  id: number;
  name: string;
  role: string;
}
