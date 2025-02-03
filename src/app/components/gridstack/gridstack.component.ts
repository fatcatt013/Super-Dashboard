import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GridStack, GridStackNode, GridStackOptions, GridStackWidget } from 'gridstack';

@Component({
  selector: 'app-gridstack',
  templateUrl: './gridstack.component.html',
  styleUrls: ['./gridstack.component.scss']
})
export class GridstackComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gridContainer') gridContainer!: ElementRef<HTMLDivElement>;
  private grid?: GridStack;
  private savedLayout: GridStackWidget[] = [];

  // Grid options for v11.3.0 – note that 'el' is no longer valid in GridStackOptions.
  private gridOptions: GridStackOptions = {
    column: 12,
    cellHeight: 100,
    margin: 10,
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

  ngAfterViewInit(): void {
    this.initializeGrid();
  }

  ngOnDestroy(): void {
    this.grid?.destroy();
  }

  private initializeGrid(): void {
    this.grid = GridStack.init(this.gridOptions, this.gridContainer.nativeElement);
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    if (!this.grid) return;

    this.grid.on('added', (event, nodes) =>
      this.onItemAdded(nodes as GridStackNode[]));

    this.grid.on('removed', (event, nodes) =>
      this.onItemRemoved(nodes as GridStackNode[]));

    this.grid.on('change', (event, nodes) =>
      this.onItemChanged(nodes as GridStackNode[]));

    this.grid.on('dragstart', (event, element) =>
      this.onDragStart(element as HTMLElement));

    this.grid.on('dragstop', (event, element) =>
      this.onDragStop(element as HTMLElement));
  }

  addNewWidget(): void {
    if (!this.grid) return;

    const widgetCount = this.grid.engine.nodes.length;
    const widget: GridStackWidget = {
      x: Math.round(Math.random() * 4),
      y: Math.round(Math.random() * 4),
      w: Math.max(2, Math.round(Math.random() * 4)),
      h: Math.max(2, Math.round(Math.random() * 2)),
      content: this.createWidgetContent(widgetCount + 1)
    };

    // Add the widget (the widget object now uses the same type as expected)
    this.grid.addWidget(widget);
  }

  private createWidgetContent(index: number): string {
    const div = document.createElement('div');
    div.className = 'grid-stack-item-content';
    div.textContent = `New Widget ${index}`;
    return div.innerHTML;
  }

  saveLayout(): void {
    if (!this.grid) return;

    // You might choose to deep clone here if needed.
    this.savedLayout = this.grid.save() as GridStackWidget[];
    console.log('Layout saved:', this.savedLayout);
  }

  loadLayout(): void {
    if (!this.grid || this.savedLayout.length === 0) return;

    // Optionally deep-clone the saved layout to remove unwanted prototype properties:
    const cleanLayout = JSON.parse(JSON.stringify(this.savedLayout));
    this.grid.load(cleanLayout);
    console.log('Layout loaded');
  }

  deleteAllWidgets(): void {
    this.grid?.removeAll();
  }

  changeColumn(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.grid?.column(parseInt(select.value, 10));
  }

  // Event handlers – converting GridStackNode array to an array of widget definitions.
  private onItemAdded(nodes: GridStackNode[]): void {
    console.log('Items added:', this.nodesToWidgets(nodes));
  }

  private onItemRemoved(nodes: GridStackNode[]): void {
    console.log('Items removed:', this.nodesToWidgets(nodes));
  }

  private onItemChanged(nodes: GridStackNode[]): void {
    console.log('Items changed:', this.nodesToWidgets(nodes));
  }

  private nodesToWidgets(nodes: GridStackNode[]): GridStackWidget[] {
    return nodes.map(node => ({
      x: node.x,
      y: node.y,
      w: node.w,
      h: node.h,
      id: node.id,
      content: node.el?.querySelector('.grid-stack-item-content')?.outerHTML
    }));
  }

  private onDragStart(element: HTMLElement): void {
    element.classList.add('dragging');
  }

  private onDragStop(element: HTMLElement): void {
    element.classList.remove('dragging');
  }
}
