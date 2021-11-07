import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { StoreModule } from '@store/store.module';
import { authenticationInitializer } from '@core/initializers/authentication.initializer';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initialStateInitializers } from '@core/initializers/initial-state.initializers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: authenticationInitializer,
      deps: [Store],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialStateInitializers,
      deps: [Store],
      multi: true
    },
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
}
