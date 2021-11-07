import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';

import { AuthState } from '@store/auth/state/auth.state';
import { User } from '@store/users/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  @SelectSnapshot(AuthState.selectCurrentUser)
  currentUser: User;

  constructor(private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    if (!!this.currentUser) {
      return true;
    }

    return this.router.createUrlTree(['/auth/login']);
  }
}
