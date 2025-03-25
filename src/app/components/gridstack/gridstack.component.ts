import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridstackService } from 'src/app/services/gridstack.service';
import { WidgetRegistryService } from 'src/app/services/widget-registry.service';
import { IGenericWidget, EPossibleWidgetNames } from 'src/app/store/interfaces/widget.interface';

@Component({
  selector: 'app-gridstack',
  templateUrl: './gridstack.component.html',
  styleUrls: ['./gridstack.component.scss']
})
export class GridstackComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef<HTMLDivElement>;
  widgets: IGenericWidget[] = [];
  private widgetsSubscription!: Subscription;
  private hasNewWidgets = false;
  showDropdown = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  constructor(public gridStackService: GridstackService, public widgetRegistry: WidgetRegistryService) {}

  ngAfterViewInit(): void {
    // Initialize Gridstack on the container element.
    this.gridStackService.initializeGrid(this.gridContainer);

    // Subscribe to the widget store (our single source of truth).
    this.widgetsSubscription = this.gridStackService.widgets$.subscribe((widgets) => {
      this.widgets = widgets;
      // Mark that new widgets are in the view; we'll enhance them shortly.
      this.hasNewWidgets = true;
    });
  }

  ngAfterViewChecked(): void {
    // After view update, if there are new grid items, call grid.makeWidget on each to enable dragging/resizing.
    if (this.hasNewWidgets && this.gridStackService.getGrid()) {
      const containerEl = this.gridContainer.nativeElement;
      const items = containerEl.querySelectorAll('.grid-stack-item');
      items.forEach(item => {
        this.gridStackService.getGrid()?.makeWidget(item as HTMLElement);
      });
      this.hasNewWidgets = false;
    }
  }

  ngOnDestroy(): void {
    this.widgetsSubscription.unsubscribe();
    this.gridStackService.collectGarbage();
  }

  handleAddWidget(widget: EPossibleWidgetNames): void {
    this.gridStackService.addNewWidget(widget, null);
    this.showDropdown = false;
  }
}
