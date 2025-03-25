import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/root/dashboard/dashboard.component';
import { SettingsComponent } from './components/root/settings/settings.component';
import { PlannerComponent } from './planner/planner/planner.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'planner', component: PlannerComponent},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
