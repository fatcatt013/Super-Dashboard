import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IConfigState } from "../interfaces/config.interface";

export const selectConfigState = createFeatureSelector<IConfigState>(
  'appConfig'
);

export const selectConfig = createSelector(
  selectConfigState,
  (state) => state.config
);

export const selectApiBaseUrl = createSelector(
  selectConfigState,
  (state) => state.config?.API_BASE_URL
);
