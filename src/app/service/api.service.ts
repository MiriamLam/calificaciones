import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }

    post<T>(url: string, body: any = {}, headers: any = {}): Observable<T> {
        return this.http.post<T>(url, body, { headers: new HttpHeaders(headers) });
    }

    get(url: string, headers: any = {}): Observable<any> {
        return this.http.get(url, { headers: new HttpHeaders(headers) });
    }

    put(url: string, body: any = {}, headers: any = {}): Observable<any> {
        return this.http.put(url, body, { headers: new HttpHeaders(headers) });
    }

    delete(url: string, headers: any = {}): Observable<any> {
        return this.http.delete(url, { headers: new HttpHeaders(headers) });
    }

    patch<T>(url: string, body: any = {}, headers: any = {}): Observable<T> {
        return this.http.patch<T>(url, body, { headers: new HttpHeaders(headers) });
    }

    mock(url: string, body: any): Observable<any> {
        const $result: Subject<any> = new Subject();
        setTimeout(() => {
            body._id = 'test';
            $result.next(body);
            $result.complete();
        }, 1000)

        return $result.asObservable();
    }

}
