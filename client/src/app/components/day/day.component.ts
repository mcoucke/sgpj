import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

import { Task } from 'src/app/models/task.model';
import { AddDialog } from 'src/app/components/dialogs/add/add.dialog.component';
import { EditDialog } from 'src/app/components/dialogs/edit/edit.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDate } from '@angular/common';

import { TaskConstants } from 'src/app/constants/task.constant';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  slots : string[] = TaskConstants.SLOTS;
  css_tasks_classes : string[][] = TaskConstants.CSS_TASKS_CLASSES;
  tasks : Task[];

  currentDay : string;
  previousDay : string;
  nextDay : string;

  // { "08:30:00" : [taskA, taskB], "08:30:00" : ...}
  tasks_slots : Map<string, Task[]>;

  constructor(
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _addDialog: MatDialog,
    private _editDialog: MatDialog,
    private _routeService: RouteService
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params : Params) => {
      this.tasks_slots = new Map<string, Task[]>();
      this.tasks = [];

      this.currentDay = params['date'];
      this.sendRoute();

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

  update() : void {
    this.ngOnInit();
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

      // if there is a task above on the right side, put the current task on the left
      // case for 2 tasks
      if (pos > 0 && nb == 2) {
        if (listTasks[0].colCssClass === this.css_tasks_classes[2][2]
          || listTasks[0].colCssClass === this.css_tasks_classes[1][1]) {
          pos = 0;
        }
      }
      //case for 3 tasks
      if (pos > 0 && nb == 3) {
        if (listTasks[0].colCssClass === this.css_tasks_classes[2][2]
          || listTasks[1].colCssClass === this.css_tasks_classes[2][2]
          || listTasks[0].colCssClass === this.css_tasks_classes[1][1]
          || listTasks[1].colCssClass === this.css_tasks_classes[1][1]) {
          pos = 0;
        }
      }

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
    const addDialogRef = this._addDialog.open(AddDialog, {
      width: '25%',
      data: {
        date: new Date(this.currentDay),
        time: "07:00",
        duration: 30,
      },
      disableClose: true
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
            this.update();
          }, (error) => {
            console.log(error);
            this.openSnackBar(error, null, 3000);
          })
      }
    })
  }

  openEditTaskDialog(task : Task): void {
    const editDialogRef = this._editDialog.open(EditDialog, {
      width: '25%',
      data: {
        id: task.id,
        date: task.date,
        time: formatDate(task.date, 'HH:mm', 'en-US'),
        duration: task.duration,
        description: task.description
      },
      disableClose: true
    });

    editDialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (result.event) {
          case 'delete': {
            this._taskService.deleteTask(result.id)
              .subscribe((data : any) => {
                this.openSnackBar('Task deleted', 'OK', 3000);
                this.update();
              }, (error) => {
                console.log(error);
                this.openSnackBar(error, null, 3000);
              })
            break;
          }
          case 'validate': {
            let timeTokens = result.data.time.split(':');
            let taskDate = new Date(Date.UTC(result.data.date.getFullYear(), result.data.date.getMonth(), 
                            result.data.date.getDate(), Number(timeTokens[0]), Number(timeTokens[1]), 0));
            this._taskService.editTask(result.data.id, result.data.description, result.data.duration, taskDate)
              .subscribe((data : any) => {
                this.openSnackBar('Task edited', 'OK', 3000);
                this.update();
              }, (error) => {
                console.log(error);
                this.openSnackBar(error, null, 3000);
              })
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  sendRoute(): void {
    this._routeService.sendRoute(this.currentDay);
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
