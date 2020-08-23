import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  slots : string[] = [
    '07:00', '07:30', '08:00', '08:30',
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00' ];

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.taskService.getDay('2020-07-14')
      .subscribe(data => {
        console.log("data : ", data);
      })
  }

}
