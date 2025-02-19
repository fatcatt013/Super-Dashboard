export interface IBaseConfig {
  "API_BASE_URL": string
}

export interface IConfigState {
  loading: boolean;
  config: IBaseConfig | null;
  baseConfigLoaded: boolean;
}
