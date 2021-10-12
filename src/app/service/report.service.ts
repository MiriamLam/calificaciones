import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

const { apiURL } = environment;

@Injectable({
    providedIn: 'root',
})

export class ReportService {

    constructor(private api: ApiService) { }

    // getReport(file: any): Observable<any> {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     return this.http.post(`${apiURL}/Grades`,  file).pipe();
    // }

    getReport(file: any) {
        const formData = new FormData();
        formData.append('file', file);
        return this.api.post(`${apiURL}/Grades`, formData);
    }

}