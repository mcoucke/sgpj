import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { WeekComponent } from './components/week/week.component';

import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'schedule', component: ScheduleComponent, children: [
      {
        path: 'day/:date', component: DayComponent, canActivate: [RouteGuard]
      },
      {
        path: 'week/:date', component: WeekComponent, canActivate: [RouteGuard]
      },
    ]
  },
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
