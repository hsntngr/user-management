import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { Logout } from '@store/auth/state/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
  }

  onLogoutClick(): void {
    this.store.dispatch(new Logout())
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }
}
