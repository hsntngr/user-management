import { User } from '@store/users/models/user.model';

export interface AuthStateModel {
  currentUser: User;
  expiresIn: number;
}
