import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '@store/users/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRole } from '@store/users/enums/user-role.enum';
import { AuthorizationService } from '@store/auth/services/authorization.service';

const ROLE_LIST = [
  { value: UserRole.superAdmin, title: 'Super Admin' },
  { value: UserRole.admin, title: 'Admin' },
  { value: UserRole.customer, title: 'Customer' },
];

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private authorizationService: AuthorizationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
  }

  ngOnInit(): void {
    this.registerForm();
    this.registerFormValues();
  }

  private registerForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required)
    });
  }

  private registerFormValues(): void {
    if (this.data && this.data.user) {
      const { username, firstName, lastName, password, role } = this.data.user;
      this.form.patchValue({ username, firstName, lastName, password, role });
    }
  }

  onFormSubmit(): void {
    if (this.form.invalid) {
      for (const control of Object.values(this.form.controls)) {
        control.markAsTouched();
        control.markAsDirty();
      }
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getRoles(): { value: UserRole, title: string }[] {
    return ROLE_LIST.filter(x => {
      if (this.authorizationService.authorize(UserRole.admin)) {
        if (x.value !== UserRole.customer) {
          return false;
        }
      }
      return true;
    });
  }
}
