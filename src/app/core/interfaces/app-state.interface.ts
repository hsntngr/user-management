import { AuthStateModel } from '@store/auth/models/auth-state.model';
import { UserStateModel } from '@store/users/models/user-state.model';

export interface AppState {
  auth: AuthStateModel;
  users: UserStateModel;
}
