import { UserRole } from '@store/users/enums/user-role.enum';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
}
