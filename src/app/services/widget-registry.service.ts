import { Injectable, Type } from '@angular/core';
import { EPossibleWidgetNames, TPossibleWidgetComponent } from '../store/interfaces/widget.interface';
import { ClockWidgetComponent } from '../components/widgetComponents/clock-widget/clock-widget.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  private registry: Record<EPossibleWidgetNames, Type<TPossibleWidgetComponent>> = {
    // chart: ChartWidgetComponent,
    // table: TableWidgetComponent
    clock: ClockWidgetComponent
  };

  getWidgetComponent(widgetType: EPossibleWidgetNames): Type<TPossibleWidgetComponent> | null {
    return this.registry[widgetType] || null;
  }
}
