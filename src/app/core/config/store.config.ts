import { NgxsModuleOptions } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { environment } from '@environment';

export const NGXS_STORE_CONFIG: NgxsModuleOptions = {
  developmentMode: !environment.production,
};

export const NGXS_STORE_DEVTOOLS_CONFIG: NgxsDevtoolsOptions =  {
  disabled: environment.production,
  maxAge: 50
};
