import { Store } from '@ngxs/store';
import * as moment from 'moment';

import { Logout, SetCurrentUser } from '@store/auth/state/auth.actions';
import { AuthConst } from '@store/auth/consts/auth.const';
import { User } from '@store/users/models/user.model';

export function authenticationInitializer(store: Store): () => void {
  return () => {
    const currentUser = localStorage.getItem(AuthConst.currentUserStorageKey);

    if (currentUser === undefined || currentUser === null) {
      return;
    }

    const expiresAt = +localStorage.getItem(AuthConst.expiresAtStorageKey);
    const secondsLeft = getTotalSecondsLeftFromToken(expiresAt);

    if (secondsLeft > 0) {
      store.dispatch(new SetCurrentUser(JSON.parse(currentUser) as User));
      setTimeout(() => store.dispatch(new Logout()), secondsLeft * 1000);
    } else {
      store.dispatch(new Logout());
    }
  };
}

export function getTotalSecondsLeftFromToken(expiresAt: number): number {
  const expiresInMoment = moment.unix(expiresAt);
  return moment.duration(expiresInMoment.diff(moment())).asSeconds();
}

