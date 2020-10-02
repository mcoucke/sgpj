import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskConstants } from 'src/app/constants/task.constant';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit.dialog.component.html',
  styleUrls: ['./edit.dialog.component.css']
})
export class EditDialog implements OnInit {

  times : string[][] = TaskConstants.TIME_INPUT_VALUES;

  constructor(
    public editDialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() : void {
      this.editDialogRef.keydownEvents().subscribe(event => {
        if (event.key === "Escape") {
            this.onNoClick();
        }
      });
    }

    onNoClick(): void {
      this.editDialogRef.close({event: 'cancel'});
    }

    onDeleteClick() {
      this.editDialogRef.close({event: 'delete', id: this.data.id});
    }

    onValidateClick() {
      this.editDialogRef.close({event: 'validate', data: this.data});
    }

}
