import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, options?): Observable<any> {
    return this.http.get(url, options);
  }

  public put(url: string, data, options?): Observable<any> {
    return this.http.put(url, data, options);
  }

  public post(url: string, data, options?): Observable<any> {
    return this.http.post(url, data, options);
  }

  public delete(url: string, options?): Observable<any> {
    return this.http.delete(url, options);
  }

}
