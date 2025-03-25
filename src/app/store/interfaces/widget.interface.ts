import { GridStackWidget } from "gridstack";
import { ClockWidgetComponent } from "src/app/components/widgetComponents/clock-widget/clock-widget.component";
import { RedmineMyIssuesWidgetComponent } from "src/app/components/widgetComponents/redmine-my-issues-widget/redmine-my-issues-widget.component";


//TODO
export type TGenericWidgetData = never | null;

export type TPossibleWidgetComponent = ClockWidgetComponent | RedmineMyIssuesWidgetComponent;

export enum EPossibleWidgetNames {
  CLOCK_WIDGET = 'clock',
  REDMINE_MY_ISSUES_WIDGETS = 'redmine_my_issues'
}

export interface IGenericWidget extends GridStackWidget{
  data: TGenericWidgetData;
  type: EPossibleWidgetNames
}

export interface IWidgetBoundaries {
  maxW?: number;
  minW?: number;
  maxH?: number;
  minH?: number;
}
