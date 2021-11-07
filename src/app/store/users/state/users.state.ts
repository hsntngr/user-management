import { Injectable } from '@angular/core';
import { patch, updateItem } from '@ngxs/store/operators';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';

import { User } from '@store/users/models/user.model';
import { UserStateModel } from '@store/users/models/user-state.model';
import { UserStateConst } from '@store/users/consts/user-state.const';
import { CreateUser, DeleteUser, SetUsers, SyncUserStorage, UpdateUser } from '@store/users/state/users.actions';

export const USER_INITIAL_STATE: UserStateModel = { users: [] };

@State<UserStateModel>({
  name: UserStateConst.userStateKey,
  defaults: USER_INITIAL_STATE
})
@Injectable()
export class UsersState {
  @Selector()
  static selectUsers({ users }: UserStateModel): User[] {
    return users;
  }

  static selectUserByUsername(username: string): (state: UserStateModel) => User {
    return createSelector([UsersState], (state: UserStateModel) => state.users.find(x => x.username === username));
  }

  static selectUserById(id: number): (state: UserStateModel) => User {
    return createSelector([UsersState], (state: UserStateModel) => state.users.find(x => x.id === id));
  }

  @Action(SetUsers)
  dispatchSetUsers(context: StateContext<UserStateModel>, { users }: SetUsers): void {
    context.patchState({ users });
  }

  @Action(SyncUserStorage)
  dispatchSyncUserStorage(context: StateContext<UserStateModel>): void {
    localStorage.setItem(UserStateConst.userStateStorageKey, JSON.stringify(context.getState()));
  }

  @Action(CreateUser)
  dispatchCreateUser(context: StateContext<UserStateModel>, { request }: CreateUser): void {
    const user: User = { ...request, id: Date.now() };
    context.patchState({ users: [...context.getState().users, user] });
    context.dispatch(new SyncUserStorage());
  }

  @Action(UpdateUser)
  dispatchUpdateUser(context: StateContext<UserStateModel>, { id, request }: UpdateUser): void {
    context.setState(patch({ users: updateItem<User>(x => x.id === id, patch(request)) }));
    context.dispatch(new SyncUserStorage());
  }

  @Action(DeleteUser)
  dispatchDeleteUser(context: StateContext<UserStateModel>, { id }: DeleteUser): void {
    context.patchState({ users: context.getState().users.filter(x => x.id !== id) });
    context.dispatch(new SyncUserStorage());
  }
}
