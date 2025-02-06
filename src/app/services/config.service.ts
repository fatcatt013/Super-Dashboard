import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IBaseConfig } from '../store/interfaces/config.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = this.fetchBaseConfig();

  constructor(private api: ApiService) {

  }

  public fetchBaseConfig(): Observable<IBaseConfig> {
    return this.api.get<IBaseConfig>({ path: '/assets/config/config.json' });
  }
}
