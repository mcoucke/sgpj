import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';
import { WeekComponent } from './components/week/week.component';

const routes: Routes = [
  // Change to a global component later
  { path: 'schedule', component: DayComponent },

  { path: 'schedule/day/:date', component: DayComponent },
  { path: 'schedule/week/:date', component: WeekComponent },
  { path: '', redirectTo: '/schedule/week/2020-07-14', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
