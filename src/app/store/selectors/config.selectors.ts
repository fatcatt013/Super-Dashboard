import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IConfigState } from "../interfaces/config.interface";

export const selectConfigState = createFeatureSelector<IConfigState>(
  'config'
);

export const selectConfig = createSelector(
  selectConfigState,
  (state) => state.config
);

export const selectConfigRedmineUrl = createSelector(
  selectConfigState,
  (state) => state.config?.REDMINE_BASE_URL
);
