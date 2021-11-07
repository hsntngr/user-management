import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Login } from '@store/auth/state/auth.actions';
import { LoginRequest } from '@store/auth/models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginFailedError: boolean;

  private destroyed$ = new Subject();

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.registerForm();
    this.registerStateListeners();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private registerForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl('123456789', Validators.required)
    });
  }

  private registerStateListeners(): void {
    this.actions$.pipe(
      ofActionSuccessful(Login),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });

    this.actions$.pipe(
      ofActionErrored(Login),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.loginFailedError = true;
      this.cdr.markForCheck();
    });
  }

  onFormSubmit(): void {
    if (this.form.invalid) {
      for (const control of Object.values(this.form.controls)) {
        control.markAsTouched();
        control.markAsDirty();
      }
      return;
    }

    this.loginFailedError = false;
    const request = this.form.value as LoginRequest;

    this.store.dispatch(new Login(request));
  }
}
