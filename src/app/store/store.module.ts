import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

import { NGXS_STORE_CONFIG, NGXS_STORE_DEVTOOLS_CONFIG } from '@core/config/store.config';
import { AuthState } from '@store/auth/state/auth.state';
import { UsersState } from '@store/users/state/users.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([AuthState, UsersState], NGXS_STORE_CONFIG),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(NGXS_STORE_DEVTOOLS_CONFIG)
  ]
})
export class StoreModule {
}
