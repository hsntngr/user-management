import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';

import { User } from '@store/users/models/user.model';
import { AuthState } from '@store/auth/state/auth.state';
import { UserRole } from '@store/users/enums/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  @SelectSnapshot(AuthState.selectCurrentUser)
  currentUser: User;

  authorize(role: UserRole | UserRole[]): boolean {
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(this.currentUser?.role);
  }
}
