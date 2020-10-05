import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';
import { WeekComponent } from './components/week/week.component';

import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  // Change to a global component later
  { path: 'schedule', component: DayComponent },

  { path: 'schedule/day/:date', component: DayComponent, canActivate: [RouteGuard] },
  { path: 'schedule/week/:date', component: WeekComponent, canActivate: [RouteGuard] },
  // { path: '**', component: WeekComponent },
  { path: '', redirectTo: '/schedule/week/2020-07-14', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
