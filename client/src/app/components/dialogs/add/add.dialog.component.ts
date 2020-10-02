import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskConstants } from 'src/app/constants/task.constant';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.css']
})
export class AddDialog implements OnInit {

  times : string[][] = TaskConstants.TIME_INPUT_VALUES;

  constructor(
    public addDialogRef: MatDialogRef<AddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() : void {
    this.addDialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
          this.onNoClick();
      }
    });
  }

  onNoClick(): void {
    this.addDialogRef.close({event: 'cancel'});
  }

  onValidateClick() {
    this.addDialogRef.close({event: 'validate', data: this.data});
  }
    

}
