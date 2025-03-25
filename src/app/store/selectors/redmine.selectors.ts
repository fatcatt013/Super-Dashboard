import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRedmineState } from "../interfaces/redmine.interface";

export const selectRedmineState = createFeatureSelector<IRedmineState>(
  'redmine'
);

export const selectMyIssues = createSelector(
  selectRedmineState,
  (state) => state.myIssues
);
