import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  onAddItem = new EventEmitter();
  onEditItem = new EventEmitter();
  itemsForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    public dialogRef: MatDialogRef<ItemsComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.itemsForm = this.formBuilder.group({
      ItemNo: [null, [Validators.required]],
      ItemName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      Description: [null, [Validators.required]],
      Supplier: [null, [Validators.required]],
      Quantity: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.itemsForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var formData = this.itemsForm.value;
    var data = {
      _id: formData.ItemNo,
      itemName: formData.ItemName,
      itemDesc: formData.Description,
      supplier: formData.Supplier,
      quantity: formData.Quantity,
    };
    this.itemsService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddItem.emit();
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

  edit() {
    var formData = this.itemsForm.value;
    var data = {
      _id: formData.ItemNo,
      itemName: formData.ItemName,
      itemDesc: formData.Description,
      supplier: formData.Supplier,
      quantity: formData.Quantity,
    };
    this.itemsService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditItem.emit();
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
