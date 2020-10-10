import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WordCountService {
  baseUrl = environment.urlServer;
  constructor(private http: HttpClient) { }

  getWordCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}${environment.getWordCount}` ,  httpOptions);
  }

  postFiltroTuit(filtro: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${environment.postFiltroTuit}` , JSON.stringify(filtro), httpOptions);
  }
}
