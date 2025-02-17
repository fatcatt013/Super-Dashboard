import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/root/navigation/navigation.component';
import { DashboardComponent } from './components/root/dashboard/dashboard.component';
import { SettingsComponent } from './components/root/settings/settings.component';
import { GridstackComponent } from './components/gridstack/gridstack.component';
import { WidgetContainerComponent } from './components/root/widget-container/widget-container.component';
import { ClockWidgetComponent } from './components/widgetComponents/clock-widget/clock-widget.component';
import { DynamicWidgetHostDirective } from './directives/dynamic-widget-host.directive';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigEffects } from './store/effects/config.effects';
import { configReducer } from './store/reducers/config.reducer';
import { ApiService } from './services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    SettingsComponent,
    GridstackComponent,
    WidgetContainerComponent,
    ClockWidgetComponent,
    WidgetContainerComponent,
    DynamicWidgetHostDirective,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({appConfig: configReducer}),
    EffectsModule.forRoot([ConfigEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      name: 'My NgRx Store'
    }),
  ],
  providers: [ApiService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
