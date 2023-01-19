import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { AddUserComponent } from './add-user/add-user.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';

export const MaterialRoutes: Routes = [
  {
    path: 'user',
    component: AddUserComponent,
  },
  {
    path: 'items',
    component: ManageItemsComponent,
  },
];
