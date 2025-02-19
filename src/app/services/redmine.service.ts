import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectApiBaseUrl } from '../store/selectors/config.selectors';
import { IGetMyIssuesResponse } from '../store/interfaces/redmine.interface';

@Injectable({
  providedIn: 'root'
})
export class RedmineService {
  private _baseUrl = '';
  private _headers = {
    "Content-Type": "application/json"
  }

  constructor(private _api: ApiService, private _store: Store) {
    this._store.select(selectApiBaseUrl).pipe().subscribe(url => {
      this._baseUrl = url as string;
    });
  }

  public getMyIssues(): Observable<IGetMyIssuesResponse>{
    return this._useIssuesEndpoint<IGetMyIssuesResponse>('GET', {params: {"assigned_to_id": "me"}})
  }

  private _useIssuesEndpoint<T>(method: 'GET' | 'POST', params?: Record<string, unknown>, body?: Record<string, unknown>){
    switch (method){
      case 'GET':
        return this._api.get<T>({
          path: `${this._baseUrl}issues/`,
          params: params,
          body: body
        }, this._headers);
      case 'POST':
        return this._api.post<T>({
          path: this._baseUrl,
          params: params,
          body: body
        }, this._headers);
    }
  }
}
