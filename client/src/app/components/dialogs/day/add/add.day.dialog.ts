import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-day-dialog',
  templateUrl: './add.day.dialog.html',
  styleUrls: ['./add.day.dialog.css']
})
export class AddDayDialog {

  constructor(
    public addDialogRef: MatDialogRef<AddDayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.addDialogRef.close();
  }
    

}
