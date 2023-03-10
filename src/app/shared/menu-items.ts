import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
  { state: 'items', name: 'Manage Items', icon: 'inventory_2' },
  { state: 'user', name: 'Create Users', icon: 'account_box' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
