import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-day-dialog',
  templateUrl: './edit.day.dialog.html',
  styleUrls: ['./edit.day.dialog.css']
})
export class EditDayDialog {

  constructor(
    public editDialogRef: MatDialogRef<EditDayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.editDialogRef.close();
    }

}
