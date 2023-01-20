import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  onAddUser = new EventEmitter();
  userForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Username: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    this.add();
  }

  add() {
    var formData = this.userForm.value;
    var data = {
      userName: formData.Username,
      password: formData.Password,
    };
    this.userService.create(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddUser.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genricError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
