import { User } from '@store/users/models/user.model';
import { CreateUserRequest } from '@store/users/models/create-user-request.model';
import { UpdateUserRequest } from '@store/users/models/update-user-request.model';

export enum UsersActionTypes {
  setUsers = '[Users] Set Users',
  createUser = '[Users] Create User',
  updateUser = '[Users] Update User',
  deleteUser = '[Users] Delete User',
  syncUsersStorage = '[Users] Sync User Storage',
}

export class SetUsers {
  static readonly type = UsersActionTypes.setUsers;

  constructor(public users: User[]) {
  }
}

export class CreateUser {
  static readonly type = UsersActionTypes.createUser;

  constructor(public request: CreateUserRequest) {
  }
}

export class UpdateUser {
  static readonly type = UsersActionTypes.updateUser;

  constructor(public id: number, public request: UpdateUserRequest) {
  }
}

export class DeleteUser {
  static readonly type = UsersActionTypes.deleteUser;

  constructor(public id: number) {
  }
}

export class SyncUserStorage {
  static readonly type = UsersActionTypes.syncUsersStorage;
}
