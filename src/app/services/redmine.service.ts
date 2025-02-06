import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectConfigRedmineUrl } from '../store/selectors/config.selectors';

export interface IRedmineIssueList {
  data: string
}

@Injectable({
  providedIn: 'root'
})
export class RedmineService {
  private _baseUrl = '';
  private _headers = {
    "Content-Type": "application/json"
  }

  constructor(private _api: ApiService, private _store: Store) {
    this._store.select(selectConfigRedmineUrl).pipe(take(1)).subscribe(url => {
      this._baseUrl = url as string;
    });
  }

  public getMyIssues(): Observable<IRedmineIssueList>{
    return this._useIssuesEndpoint<IRedmineIssueList>('GET', {"assigned_to_id": "me"})
  }

  private _useIssuesEndpoint<T>(method: 'GET' | 'POST', params?: Record<string, unknown>, body?: Record<string, unknown>){
    switch (method){
      case 'GET':
        return this._api.get<T>({
          path: this._baseUrl,
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
