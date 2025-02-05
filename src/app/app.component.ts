import { Component, OnInit } from '@angular/core';
import { fetchBaseConfig } from './store/actions/config.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Super-Dashboard';
  isCollapsed = false;

  constructor(private store: Store){}

  handleCollapseChange(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

  ngOnInit(){
    this.store.dispatch(fetchBaseConfig());
  }
}
