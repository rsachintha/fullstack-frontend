import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserComponent } from '../dialog/user/user.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(UserComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }
}
