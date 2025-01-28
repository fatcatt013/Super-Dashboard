import { Component } from '@angular/core';
import { GridStackOptions } from 'gridstack';

@Component({
  selector: 'app-gridstack',
  templateUrl: 'gridstack.component.html',
  styleUrls: ['gridstack.component.scss'],
})
export class GridStackComponent {
  // sample grid options + items to load...
  public gridOptions: GridStackOptions = {
    margin: 5,
    children: [ // or call load()/addWidget() with same data
      {x:0, y:0, minW:2, content:'Item 1'},
      {x:1, y:0, content:'Item 2'},
      {x:0, y:1, content:'Item 3'},
    ]
  }
}
