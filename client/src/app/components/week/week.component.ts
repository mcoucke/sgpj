import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDate } from '@angular/common';

import { TaskConstants } from 'src/app/constants/task.constant';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  
  slots : string[] = TaskConstants.SLOTS;
  css_tasks_classes : string[][] = TaskConstants.CSS_TASKS_CLASSES;
  days_count : number = TaskConstants.DAYS_COUNT;
  week_map : number[] = [6, 0, 1, 2, 3, 4, 5];

  tasks_slots : Map<string, Task[]>[];
  tasks : Task[][];

  currentDay : string;
  previousDay : string;
  nextDay : string;
  weekDates : string[];

  constructor(
    private _taskService : TaskService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params : Params) => {
      this.tasks_slots = [...Array(this.days_count)].map(e => new Map<string, Task[]>());

      this.tasks = [...Array(this.days_count)].map(e => Array(0));

      this.currentDay = params['date'];

      this.initNavigation();

      this.initWeekDates();

      this._taskService.getWeek(this.currentDay)
        .subscribe((data : Object[]) => {
          data.forEach(t => {
            let task = new Task().deserialize(t);
            this.tasks[this.week_map[task.date.getDay()]].push(task);
          })
          this.fillTasksSlots();
          this.setCssClasses();
        }
      );
    })
  }

  getCurrentWeekTitle() {
    let currDate = new Date(this.currentDay);
    return formatDate(currDate, 'MMMM y', 'en-US');
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
    for (let weekDay = 0; weekDay < this.days_count; weekDay++) {
      for (let t of this.tasks[weekDay]) {
        let startDate = new Date(t.date.getTime());
        for (let i = 0; i < this.getSpanSize(t); i++) {
          if (!(startDate.toLocaleTimeString() in this.tasks_slots[weekDay])) {
            this.tasks_slots[weekDay][startDate.toLocaleTimeString()] = [];
          }
          this.tasks_slots[weekDay][startDate.toLocaleTimeString()].push(t);
          startDate.setMinutes(startDate.getMinutes() + 30);
        }
      }
    }
  }

  //Assign correct css class and row position for each task
  setCssClasses() {
    for (let weekDay = 0; weekDay < this.days_count; weekDay++) {
      this.tasks[weekDay].forEach(task => {
        // Column css position
        let listTasks = this.getMaxNeighbours(task);
        // tasks count
        let nb = listTasks.length;
        // index of task in list
        let pos = listTasks.map(function(e) { return e.id; }).indexOf(task.id);
        task.colCssClass = this.css_tasks_classes[nb-1][pos];
        // Row css position
        // first +1 to start at first row, second +1 to add 1 row of padding
        let startPos = this.getGridRowPosFromDate(task) + 1 + 1;
        let stopPos = this.getSpanSize(task) + startPos;
        task.gridRowValue = startPos + " / " + stopPos;
      })
    }
  }

  // Return maximum neighbours count for a given task
  getMaxNeighbours(task : Task) {
    let maxNeighs = [task];
    let startDate = new Date(task.date.getTime());
    for (let i = 0; i < this.getSpanSize(task); i++) {
      if (this.tasks_slots[this.week_map[task.date.getDay()]][startDate.toLocaleTimeString()].length > maxNeighs.length) {
        maxNeighs = this.tasks_slots[this.week_map[task.date.getDay()]][startDate.toLocaleTimeString()];
      }
      startDate.setMinutes(startDate.getMinutes() + 30);
    }
    return maxNeighs;
  }

  initNavigation() {
    let currentDate = new Date(this.currentDay);

    let previousDate = new Date(this.currentDay);
    previousDate.setDate(currentDate.getDate() - this.days_count);
    this.previousDay = this.parseToRoute(previousDate);

    let nextDate = new Date(this.currentDay);
    nextDate.setDate(currentDate.getDate() + this.days_count);
    this.nextDay = this.parseToRoute(nextDate);
  }

  initWeekDates() {
    this.weekDates = [];
    let date = new Date(this.currentDay);
    let daysFromMonday = this.week_map[date.getDay()];
    date.setDate(date.getDate() - daysFromMonday);
    this.weekDates.push(formatDate(new Date(date), 'EEE dd', 'en-US'));
    for (let i = 0; i < this.days_count - 1; i++) {
      date.setDate(date.getDate() + 1)
      let nextDay = new Date(date);
      this.weekDates.push(formatDate(nextDay, 'EEE dd', 'en-US'));
    }
  }

  parseToRoute(date : Date) {
    let str = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return str;
  }

}