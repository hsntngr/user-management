import { User } from '@store/users/models/user.model';
import { LoginRequest } from '@store/auth/models/login-request.model';

export enum AuthActionTypes {
  login = '[Auth] Login',
  logout = '[Auth] Logout',
  setCurrentUser = '[Auth] Set Current User'
}

export class Login {
  static readonly type = AuthActionTypes.login;

  constructor(public request: LoginRequest) {
  }
}

export class Logout {
  static readonly type = AuthActionTypes.logout;
}

export class SetCurrentUser {
  static readonly type = AuthActionTypes.setCurrentUser;

  constructor(public user: User) {
  }
}
