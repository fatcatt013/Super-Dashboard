import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyPlannerComponent } from './weekly-planner/weekly-planner.component';
import { PlannerComponent } from './planner/planner.component';


@NgModule({
  declarations: [
    WeeklyPlannerComponent,
    PlannerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlannerModule { }
