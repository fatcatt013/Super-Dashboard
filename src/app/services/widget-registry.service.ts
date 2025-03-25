import { Injectable, Type } from '@angular/core';
import { EPossibleWidgetNames, IWidgetBoundaries, TPossibleWidgetComponent } from '../store/interfaces/widget.interface';
import { ClockWidgetComponent } from '../components/widgetComponents/clock-widget/clock-widget.component';
import { RedmineMyIssuesWidgetComponent } from '../components/widgetComponents/redmine-my-issues-widget/redmine-my-issues-widget.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  private registry: Record<EPossibleWidgetNames, Type<TPossibleWidgetComponent>> = {
    [EPossibleWidgetNames.CLOCK_WIDGET]: ClockWidgetComponent,
    [EPossibleWidgetNames.REDMINE_MY_ISSUES_WIDGETS]: RedmineMyIssuesWidgetComponent
  };

  private boundaries: Record<EPossibleWidgetNames, IWidgetBoundaries> = {
    [EPossibleWidgetNames.CLOCK_WIDGET]: {
      minW: 2,
      minH: 4
    },
    [EPossibleWidgetNames.REDMINE_MY_ISSUES_WIDGETS]: {
      minW: 2,
      minH: 4
    }
  }

  getWidgetComponent(widgetType: EPossibleWidgetNames): Type<TPossibleWidgetComponent> | null {
    return this.registry[widgetType] || null;
  }

  getWidgetBoundaries(widgetType: EPossibleWidgetNames): IWidgetBoundaries | null {
    return this.boundaries[widgetType] || null
  }

  getRegistryKeys(): EPossibleWidgetNames[] {
    return Object.keys(this.registry) as EPossibleWidgetNames[];
  }

  getRegistryKeyLabel(key: EPossibleWidgetNames): string {
    switch (key){
      case EPossibleWidgetNames.CLOCK_WIDGET:
        return 'Clock';
      case EPossibleWidgetNames.REDMINE_MY_ISSUES_WIDGETS:
        return 'My issues';
    }
  }
}
