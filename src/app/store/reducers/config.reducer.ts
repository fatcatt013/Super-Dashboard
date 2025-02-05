import { createReducer, on } from "@ngrx/store";
import { fetchBaseConfig, fetchBaseConfigFailure, fetchBaseConfigSuccess } from "../actions/config.actions";

export interface IConfigState {
  loading: boolean;
  config: unknown;
  baseConfigLoaded: boolean;
}

const initialState: IConfigState = {
  loading: false,
  config: {},
  baseConfigLoaded: false
}

export const configReducer = createReducer(
  initialState,
  on(
    fetchBaseConfig,
    (state): IConfigState => ({
      ...state,
      loading: true
    })
  ),
  on(
    fetchBaseConfigSuccess,
    (state, {data}): IConfigState => ({
      ...state,
      config: data,
      loading: false,
      baseConfigLoaded: true
    })
  ),
  on(
    fetchBaseConfigFailure,
    (state): IConfigState => ({
      ...state,
      loading: false,

    })
  ),
);
