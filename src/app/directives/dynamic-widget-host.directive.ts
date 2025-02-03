/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicWidgetHost]'
})
export class DynamicWidgetHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
