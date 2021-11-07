import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { UsersState } from '@store/users/state/users.state';
import { User } from '@store/users/models/user.model';
import { UserFormComponent } from '@shared/components/user-form/user-form.component';
import { CreateUser, DeleteUser, UpdateUser } from '@store/users/state/users.actions';
import { AuthorizationService } from '@store/auth/services/authorization.service';
import { UserRole } from '@store/users/enums/user-role.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  @Select(UsersState.selectUsers)
  users$: Observable<User[]>;

  displayedColumns = ['username', 'firstName', 'lastName', 'role', 'id'];

  private destroyed$ = new Subject();

  constructor(
    private authorizationService: AuthorizationService,
    private dialogService: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onCreateUserClick(): void {
    const dialogRef = this.dialogService.open(UserFormComponent);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter(request => !!request)
      )
      .subscribe(result => this.store.dispatch(new CreateUser(result)));
  }

  onEditUser(id: number): void {
    const user = this.store.selectSnapshot(UsersState.selectUserById(id));
    const dialogRef = this.dialogService.open(UserFormComponent, {
      data: { user }
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter(request => !!request)
      )
      .subscribe(result => this.store.dispatch(new UpdateUser(id, result)));
  }

  onDeleteClick(id: number): void {
    this.store.dispatch(new DeleteUser(id));
  }

  getUsers(): Observable<User[]> {
    return this.users$
      .pipe(map(users => users.filter(x => {
        if (this.authorizationService.authorize(UserRole.admin)) {
          if (x.role !== UserRole.customer) {
            return false;
          }
        }
        return true;
      })));
  }

  getRoleHumanReadable(role: UserRole): string {
    switch (role) {
      case UserRole.superAdmin: return 'Süper Admin';
      case UserRole.admin: return 'Admin';
      case UserRole.customer: return 'Customer';
    }
  }
}
