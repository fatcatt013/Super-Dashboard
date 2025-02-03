import { GridStackWidget } from "gridstack";
import { ClockWidgetComponent } from "src/app/components/widgetComponents/clock-widget/clock-widget.component";


//TODO
export type TGenericWidgetData = never | null;

export type TPossibleWidgetComponent = ClockWidgetComponent;

export enum EPossibleWidgetNames {
  CLOCK_WIDGET = 'clock'
}

export interface IGenericWidget extends GridStackWidget{
  data: TGenericWidgetData;
  type: EPossibleWidgetNames
}
