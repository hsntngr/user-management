import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthConst } from '@store/auth/consts/auth.const';
import { UserRole } from '@store/users/enums/user-role.enum';
import { AuthorizationGuard } from '@store/auth/guards/authorization.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', pathMatch: 'full', loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule) },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(x => x.UsersModule),
        canLoad: [AuthorizationGuard],
        data: {
          [AuthConst.authorizedRolesDataKey]: [UserRole.admin, UserRole.superAdmin]
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
