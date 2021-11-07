import { Store } from '@ngxs/store';

import { SetUsers } from '@store/users/state/users.actions';
import { INITIAL_USERS_DATA } from '@core/data/users.data';
import { UserStateConst } from '@store/users/consts/user-state.const';
import { UserStateModel } from '@store/users/models/user-state.model';

export function initialStateInitializers(store: Store): () => void {
  return () => {
    const usersState = localStorage.getItem(UserStateConst.userStateStorageKey);
    if (!!usersState) {
      const { users } = JSON.parse(usersState) as UserStateModel;
      store.dispatch(new SetUsers(users || INITIAL_USERS_DATA));
    } else {
      store.dispatch(new SetUsers(INITIAL_USERS_DATA));
    }
  };
}
