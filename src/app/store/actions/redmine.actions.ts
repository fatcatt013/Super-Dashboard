import { createAction, props } from '@ngrx/store';
import { IRedmineIssueList } from 'src/app/services/redmine.service';

export enum RedmineActionTypes {
  GET_MY_ISSUES = '[Redmine] Get my issues',
  GET_MY_ISSUES_SUCCESS = '[Redmine] Get my issues success',
  GET_MY_ISSUES_FAILURE = '[Redmine] Get my issues failure',

}

export const getMyIssues = createAction(
  RedmineActionTypes.GET_MY_ISSUES,
);

export const getMyIssuesSuccess = createAction(
  RedmineActionTypes.GET_MY_ISSUES_SUCCESS,
  props<{ data: IRedmineIssueList }>()
);

export const getMyIssuesFailure = createAction(
  RedmineActionTypes.GET_MY_ISSUES_FAILURE,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>()
);
