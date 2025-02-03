import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/root/navigation/navigation.component';
import { DashboardComponent } from './components/root/dashboard/dashboard.component';
import { SettingsComponent } from './components/root/settings/settings.component';
import { GridstackComponent } from './components/gridstack/gridstack.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    SettingsComponent,
    GridstackComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
