import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todayRoute : string;

  constructor() { }

  ngOnInit(): void {
    this.todayRoute = this.parseToRoute(new Date());
  }

  parseToRoute(date : Date) {
    let str = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return str;
  }

}
