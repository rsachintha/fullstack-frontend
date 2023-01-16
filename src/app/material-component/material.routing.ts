import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageItemsComponent } from './manage-items/manage-items.component';

export const MaterialRoutes: Routes = [
  {
    path: 'items',
    component: ManageItemsComponent,
  },
];
