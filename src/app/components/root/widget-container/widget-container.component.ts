import { Component, Input, OnInit, ComponentRef, ViewChild, Type } from '@angular/core';
import { DynamicWidgetHostDirective } from 'src/app/directives/dynamic-widget-host.directive';
import { WidgetRegistryService } from 'src/app/services/widget-registry.service';
import { IGenericWidget, TPossibleWidgetComponent } from 'src/app/store/interfaces/widget.interface';

@Component({
  selector: 'app-widget-container',
  template: `<div class="grid-stack-item-content">
               <ng-template dynamicWidgetHost></ng-template>
             </div>`
})
export class WidgetContainerComponent implements OnInit {
  @Input() widget!: IGenericWidget

  @ViewChild(DynamicWidgetHostDirective, { static: true })
  dynamicHost!: DynamicWidgetHostDirective;

  private componentRef!: ComponentRef<TPossibleWidgetComponent>;

  constructor(private widgetRegistry: WidgetRegistryService) {}

  ngOnInit(): void {
    const compType: Type<TPossibleWidgetComponent> | null = this.widgetRegistry.getWidgetComponent(this.widget.type);
    if (compType) {
      const viewContainerRef = this.dynamicHost.viewContainerRef;
      viewContainerRef.clear();
      // Create the component dynamically.
      this.componentRef = viewContainerRef.createComponent(compType);
      // Optionally, pass data to the component
      if (this.widget.data) {
        Object.assign(this.componentRef.instance, this.widget.data);
      }
    } else {
      console.error(`No component registered for widget type: ${this.widget.type}`);
    }
  }
}
