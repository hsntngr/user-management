import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from '@shared/components/alert/alert.component';
import { AuthorizeDirective } from './directives/authorize/authorize.directive';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AlertComponent,
    AuthorizeDirective,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
  ],
  exports: [
    AlertComponent,
    AuthorizeDirective,
    UserFormComponent,
    MatDialogModule
  ],
  providers: [
    MatDialog
  ]
})
export class SharedModule {
}
