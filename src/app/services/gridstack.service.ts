import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridStack, GridStackOptions } from 'gridstack';
import { EPossibleWidgetNames, IGenericWidget, TGenericWidgetData } from '../store/interfaces/widget.interface';
import { WidgetRegistryService } from './widget-registry.service';

@Injectable({
  providedIn: 'root'
})
export class GridstackService {
  // The Gridstack instance (layout engine)
  private grid?: GridStack;
  // Our Angular store: the single source of truth for widget definitions
  private widgetsSubject = new BehaviorSubject<IGenericWidget[]>([]);
  public widgets$ = this.widgetsSubject.asObservable();

  constructor(private registry: WidgetRegistryService){}

  lastId = '0';

  // Default gridstack options
  private gridOptions: GridStackOptions = {
    column: 12,
    cellHeight: 20,
    margin: 1,
    minRow: 1,
    float: true,
    animate: true,
    disableDrag: false,
    disableResize: false,
    acceptWidgets: '.grid-stack-item',
    removable: '#trash',
    styleInHead: true,
    draggable: {
      handle: '.grid-stack-item-content',
      scroll: true,
      appendTo: 'body'
    }
  };

  /**
   * Initializes Gridstack on the given container element.
   */
  initializeGrid(gridContainer: ElementRef<HTMLDivElement>): void {
    this.grid = GridStack.init(this.gridOptions, gridContainer.nativeElement);
    this.setupEventHandlers();
  }

  /**
   * Sets up gridstack event handlers. For example, when the user drags or resizes a widget,
   * we update our store (the source of truth) with the new layout.
   */
  private setupEventHandlers(): void {
    if (!this.grid) return;
    this.grid.on('dragstart', (event, element) => {
      (element as HTMLElement).classList.add('dragging');
    });
    this.grid.on('dragstop', (event, element) => {
      (element as HTMLElement).classList.remove('dragging');
    });
  }

  // Helper to find a widget in our store by id.
  private findWidgetById(id: string | number | undefined): Partial<IGenericWidget> | null {
    const current = this.widgetsSubject.getValue();
    return current.find(widget => widget.id === id) || null;
  }

  /**
   * Adds a new widget. The widget is defined solely as an object
   * (without DOM elements), and the Angular store is updated.
   */
  addNewWidget(type: EPossibleWidgetNames, data: TGenericWidgetData): void {
    const current = this.widgetsSubject.getValue();
    const boundaries = this.registry.getWidgetBoundaries(type);
    // Generate a unique id (for demo purposes, use Date.now())
    const newWidget: IGenericWidget = {
      id: this.lastId.toString(),
      x: Math.round(Math.random() * 4),
      y: Math.round(Math.random() * 4),
      w: 5,
      h: 10,

      //boundaries
      maxW: boundaries?.maxW,
      minW: boundaries?.minW,
      maxH: boundaries?.maxH,
      minH: boundaries?.minH,

      // content will be rendered by an Angular component inside the grid item
      type: type,
      data: data
    };
    this.widgetsSubject.next([...current, newWidget]);
    this.lastId = String(parseInt(this.lastId) + 1);
  }

  deleteAllWidgets(): void {
    this.grid?.removeAll();
    this.widgetsSubject.next([]);
  }

  /**
   * Clean up the gridstack instance when no longer needed.
   */
  collectGarbage(): void {
    this.grid?.destroy();
  }

  getGrid(): GridStack | undefined {
    return this.grid;
  }
}
