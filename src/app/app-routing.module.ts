import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect from "" to "/dashboard"
  { path: 'dashboard', component: DashboardComponent }, // Route to DashboardComponent
  { path: '**', redirectTo: '/dashboard' }, // Optional: Catch-all route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
