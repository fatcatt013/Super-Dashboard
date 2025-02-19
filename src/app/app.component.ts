import { Component, OnDestroy, OnInit } from '@angular/core';
import { fetchBaseConfig, fetchBaseConfigSuccess } from './store/actions/config.actions';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { getMyIssues } from './store/actions/redmine.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Super-Dashboard';
  isCollapsed = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private store: Store, private _updates$: Actions){}

  handleCollapseChange(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

  ngOnInit(){
    this.store.dispatch(fetchBaseConfig());

    this._updates$.pipe(ofType(fetchBaseConfigSuccess), takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.store.dispatch(getMyIssues());
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
