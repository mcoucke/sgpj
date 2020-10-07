import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentDayRoute : string;
  todayRoute : string;

  subscription : Subscription;

  constructor(private _routeService : RouteService) { }

  ngOnInit(): void {
    this.todayRoute = this.parseToRoute(new Date());
    this.subscription = this._routeService.getRoute().subscribe(route => {
      this.currentDayRoute = route;
    })
  }

  parseToRoute(date : Date) {
    let str = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return str;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
