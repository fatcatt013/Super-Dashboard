export interface IBaseConfig {
  "REDMINE_API_KEY": string,
  "REDMINE_BASE_URL": string
}

export interface IConfigState {
  loading: boolean;
  config: IBaseConfig | null;
  baseConfigLoaded: boolean;
}
