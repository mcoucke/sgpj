import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

import { Task } from 'src/app/models/task.model';
import { AddDayDialog } from 'src/app/dialogs/day/add/add.day.dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  slots : string[] = [
    '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00' ];

  css_tasks_classes : string[][] = [
    ['complete-col'],
    ['left-half-col', 'right-half-col'],
    ['left-third-col', 'mid-third-col', 'right-third-col']
  ];

  tasks : Task[];

  currentDay : string;
  previousDay : string;
  nextDay : string;

  // { "08:30:00" : [taskA, taskB], "08:30:00" : ...}
  tasks_slots : Map<string, Task[]>;

  constructor(
    private _taskService : TaskService,
    private _route: ActivatedRoute,
    private _snackBar : MatSnackBar,
    public addDialog : MatDialog
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params : Params) => {
      this.tasks_slots = new Map<string, Task[]>();
      this.tasks = [];

      this.currentDay = params['date'];

      this.initNavigation();

      this._taskService.getDay(this.currentDay)
        .subscribe((data : Object[]) => {
          data.forEach(t => {
            this.tasks.push(new Task().deserialize(t));
          })
          this.fillTasksSlots();
          this.setCssClasses();
        }
      );
    })
    
  }

  getCurrentDateTitle() {
    let currDate = new Date(this.currentDay);
    return formatDate(currDate, 'fullDate', 'en-US');
  }

  //Compute span size using task duration
  getSpanSize(task : Task) {
    return Math.ceil(task.duration / 30);
  }

  //Compute task position on grid rows using task date
  getGridRowPosFromDate(task : Task) {
    let minutes = task.date.getHours() * 60 + task.date.getMinutes();
    // Removing 7 hours to know how much rows to skip from first hour
    let correctTime = minutes - 420;
    return Math.ceil(correctTime / 30);
  }

  //Insert tasks in each time slot it belongs to
  fillTasksSlots() {
    for (let t of this.tasks) {
      let startDate = new Date(t.date.getTime());
      for (let i = 0; i < this.getSpanSize(t); i++) {
        if (!(startDate.toLocaleTimeString() in this.tasks_slots)) {
          this.tasks_slots[startDate.toLocaleTimeString()] = [];
        }
        this.tasks_slots[startDate.toLocaleTimeString()].push(t);
        startDate.setMinutes(startDate.getMinutes() + 30);
      }
    }
  }

  //Assign correct css class and row position for each task
  setCssClasses() {
    this.tasks.forEach(task => {
      // Column css position
      let listTasks = this.getMaxNeighbours(task);
      // tasks count
      let nb = listTasks.length;
      // index of task in list
      let pos = listTasks.map(function(e) { return e.id; }).indexOf(task.id);
      task.colCssClass = this.css_tasks_classes[nb-1][pos];
      // Row css position
      let startPos = this.getGridRowPosFromDate(task) + 1;
      let stopPos = this.getSpanSize(task) + startPos;
      task.gridRowValue = startPos + " / " + stopPos;
    })
  }
 
  // Return maximum neighbours count for a given task
  getMaxNeighbours(task : Task) {
    let maxNeighs = [task];
    let startDate = new Date(task.date.getTime());
    for (let i = 0; i < this.getSpanSize(task); i++) {
      if (this.tasks_slots[startDate.toLocaleTimeString()].length > maxNeighs.length) {
        maxNeighs = this.tasks_slots[startDate.toLocaleTimeString()];
      }
      startDate.setMinutes(startDate.getMinutes() + 30);
    }
    return maxNeighs;
  }

  openAddTaskDialog(): void {
    const addDialogRef = this.addDialog.open(AddDayDialog, {
      width: '25%',
      data: {
        date: new Date(this.currentDay),
        time: "07:00",
        duration: 30,
      }
    });

    addDialogRef.afterClosed().subscribe(result => {
      if (result) {
        let timeTokens = result.time.split(':');
        let taskDate = new Date(Date.UTC(result.date.getFullYear(), result.date.getMonth(), 
                        result.date.getDate(), Number(timeTokens[0]), Number(timeTokens[1]), 0));
        this._taskService.addTask(result.description, result.duration, taskDate)
          .subscribe((data : any) => {
            let dateObj = new Date(data.date);
            this.openSnackBar('Task added to ' + dateObj.toLocaleDateString(), 'OK', 3000);
          }, (error) => {
            console.log(error);
            this.openSnackBar(error, null, 3000);
          })
      }
    })
  }

  openEditTaskDialog(task : Task): void {
    console.log(task);
  }


  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  initNavigation() {
    let currentDate = new Date(this.currentDay);

    let previousDate = new Date(this.currentDay);
    previousDate.setDate(currentDate.getDate() - 1);
    this.previousDay = this.parseToRoute(previousDate);

    let nextDate = new Date(this.currentDay);
    nextDate.setDate(currentDate.getDate() + 1);
    this.nextDay = this.parseToRoute(nextDate);
  }

  parseToRoute(date : Date) {
    let str = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return str;
  }

}
