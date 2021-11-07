import { UserRole } from '@store/users/enums/user-role.enum';

export interface UpdateUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
}
