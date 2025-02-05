import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = this.fetchBaseConfig();

  constructor(private api: ApiService) {

  }

  public fetchBaseConfig() {
    return this.api.get({ path: '/assets/config/config.json' });
  }

}
