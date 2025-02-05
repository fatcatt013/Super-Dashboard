import { createAction, props } from '@ngrx/store';

export enum ConfigActionTypes {
  FETCH_BASE_CONFIG = '[Config] Fetch base config',
  FETCH_BASE_CONFIG_SUCCESS = '[Config] Fetch base config success',
  FETCH_BASE_CONFIG_FAILURE = '[Config] Fetch base config failure',

}

export const fetchBaseConfig = createAction(
  ConfigActionTypes.FETCH_BASE_CONFIG,
);

export const fetchBaseConfigSuccess = createAction(
  ConfigActionTypes.FETCH_BASE_CONFIG_SUCCESS,
  props<{ data: unknown }>()
);

export const fetchBaseConfigFailure = createAction(
  ConfigActionTypes.FETCH_BASE_CONFIG_FAILURE,
  props<{ error: unknown }>()
);
