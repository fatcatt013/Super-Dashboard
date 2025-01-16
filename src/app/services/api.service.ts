/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type Headers = Record<string, string>;
export interface ApiCall {
  path?: string;
  params?: Record<string, any>;
  body?: any;
}

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get apiUrl() {
    return ``;
  }

  public get<T>(options: ApiCall, headers: Headers = {}): Observable<T> {
    if (options.params && options.params['headers']) {
      headers = { ...headers, ...options.params['headers'] };
    }
    return this.http.get<T>(
      this.apiUrl + options.path,
      { observe: 'body', responseType: 'json', headers, params: options.params?.['params'] },
    );
  }

  public getBlob(options: ApiCall, headers: Headers = {}): Observable<Blob> {
    return this.http.get(
      this.apiUrl + options.path,
      { observe: 'body', responseType: 'blob', headers },
    );
  }

  public post<T>(options: ApiCall, headers: Headers = {}): Observable<T> {
    if (options.params && options.params['headers']) {
      headers = { ...headers, ...options.params['headers'] };
    }
    return this.http.post<T>(
      this.apiUrl + options.path,
      options.body,
      { ...options.params, observe: 'body', responseType: 'json', headers },
    );
  }

  public put<T>(options: ApiCall, headers: Headers = {}): Observable<T> {
    if (options.params && options.params['headers']) {
      headers = { ...headers, ...options.params['headers'] };
    }
    return this.http.put<T>(
      this.apiUrl + options.path,
      options.body,
      { ...options.params, observe: 'body', responseType: 'json', headers },
    );
  }

  public delete<T>(options: ApiCall): Observable<T> {
    return this.http.delete<T>(
      this.apiUrl + options.path,
      { ...options.params, observe: 'body', responseType: 'json' },
    );
  }
}
