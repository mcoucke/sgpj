import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DayComponent } from './components/day/day.component';

import { AddDialog } from 'src/app/components/dialogs/add/add.dialog.component';
import { EditDialog } from 'src/app/components/dialogs/edit/edit.dialog.component';

import { TaskService } from './services/task/task.service';
import { RouteService } from './services/route/route.service';

import { RouteGuard } from './guards/route.guard';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';


import { WeekComponent } from './components/week/week.component';
import { MonthComponent } from './components/month/month.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScheduleComponent } from './components/schedule/schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    AddDialog,
    EditDialog,
    WeekComponent,
    MonthComponent,
    MenuComponent,
    NotFoundComponent,
    ScheduleComponent
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
    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [TaskService, RouteService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
