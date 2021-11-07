import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';

import { AuthorizationService } from '@store/auth/services/authorization.service';
import { AuthConst } from '@store/auth/consts/auth.const';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanLoad {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    if (this.authorizationService.authorize(route.data[AuthConst.authorizedRolesDataKey])) {
      return true;
    }

    this.router.createUrlTree(['/dashboard']);
  }
}
