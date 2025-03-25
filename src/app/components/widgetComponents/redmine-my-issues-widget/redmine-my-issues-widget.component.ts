import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRedmineIssue } from 'src/app/store/interfaces/redmine.interface';
import { selectMyIssues } from 'src/app/store/selectors/redmine.selectors';

@Component({
  selector: 'app-redmine-my-issues-widget',
  templateUrl: './redmine-my-issues-widget.component.html',
  styleUrls: ['./redmine-my-issues-widget.component.scss']
})
export class RedmineMyIssuesWidgetComponent {
  myIssues$: Observable<IRedmineIssue[]> = this.store.select(selectMyIssues);

  constructor(private store: Store){}


}
