import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DayComponent } from './components/day/day.component';

import { AddDayDialog } from './components/dialogs/day/add/add.day.dialog';
import { EditDayDialog } from './components/dialogs/day/edit/edit.day.dialog';

import { TaskService } from './services/task/task.service';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WeekComponent } from './components/week/week.component';
import { MonthComponent } from './components/month/month.component';


@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    AddDayDialog,
    EditDayDialog,
    WeekComponent,
    MonthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
