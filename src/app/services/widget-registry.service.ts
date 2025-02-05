import { Injectable, Type } from '@angular/core';
import { EPossibleWidgetNames, IWidgetBoundaries, TPossibleWidgetComponent } from '../store/interfaces/widget.interface';
import { ClockWidgetComponent } from '../components/widgetComponents/clock-widget/clock-widget.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  private registry: Record<EPossibleWidgetNames, Type<TPossibleWidgetComponent>> = {
    clock: ClockWidgetComponent
  };

  private boundaries: Record<EPossibleWidgetNames, IWidgetBoundaries> = {
    clock: {
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
}
