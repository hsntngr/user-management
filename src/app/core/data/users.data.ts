import { User } from '@store/users/models/user.model';
import { UserRole } from '@store/users/enums/user-role.enum';

export const INITIAL_USERS_DATA: User[] = [
  { id: 1, username: 'super_admin', password: '123456789',  firstName: 'Super', lastName: 'Admin', role: UserRole.superAdmin },
  { id: 2, username: 'admin', password: '123456789',  firstName: 'Test', lastName: 'Admin', role: UserRole.admin },
  { id: 3, username: 'customer', password: '123456789',  firstName: 'Test', lastName: 'Customer', role: UserRole.customer },
];
