import { Injectable, NgZone } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { User } from '@store/users/models/user.model';
import { AuthStateConst } from '@store/auth/consts/auth-state.const';
import { AuthStateModel } from '@store/auth/models/auth-state.model';
import { Login, Logout, SetCurrentUser } from '@store/auth/state/auth.actions';
import { UsersState } from '@store/users/state/users.state';
import { AuthConst } from '@store/auth/consts/auth.const';
import { AUTH_EXPIRES_IN } from '@core/config/auth.config';
import { authenticationInitializer } from '@core/initializers/authentication.initializer';

export const AUTH_INITIAL_STATE: AuthStateModel = {
  currentUser: null,
  expiresIn: 0
};

@State<AuthStateModel>({
  name: AuthStateConst.authStateKey,
  defaults: AUTH_INITIAL_STATE
})
@Injectable()
export class AuthState {
  constructor(
    private store: Store,
    private router: Router,
    private zone: NgZone
  ) {
  }

  @Selector()
  static selectCurrentUser({ currentUser }: AuthStateModel): User {
    return currentUser;
  }

  @Action(SetCurrentUser)
  dispatchCurrentUser(context: StateContext<AuthStateModel>, { user }: SetCurrentUser): void {
    context.patchState({ currentUser: user });
  }

  @Action(Login)
  dispatchLogin(context: StateContext<AuthStateModel>, { request }: Login): void {
    const { username, password } = request;
    const currentUser = this.store.selectSnapshot<User>(UsersState.selectUserByUsername(username));
    if (currentUser?.password === password) {
      localStorage.setItem(AuthConst.currentUserStorageKey, JSON.stringify(currentUser));
      localStorage.setItem(AuthConst.expiresAtStorageKey, (moment.now().valueOf() / 1000 + AUTH_EXPIRES_IN).toString());
      context.patchState({ currentUser });
      this.zone.run(() => {
        authenticationInitializer(this.store).call(null);
      });
    } else {
      throw new Error('Authentication Failed');
    }
  }

  @Action(Logout)
  dispatchLogout(context: StateContext<AuthStateModel>): void {
    localStorage.removeItem(AuthConst.currentUserStorageKey);
    localStorage.removeItem(AuthConst.expiresAtStorageKey);
    context.patchState(AUTH_INITIAL_STATE);
    this.zone.run(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
