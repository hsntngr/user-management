import { Component, OnInit } from '@angular/core';
import { UserRole } from '@store/users/enums/user-role.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  getAuthorizedRolesForUserList(): UserRole[] {
    const { superAdmin, admin } = UserRole;
    return [admin, superAdmin];
  }
}
