import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ReportService } from "../service/report.service"
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
export class ReportStore
{
    constructor(
        private reportService: ReportService,
        private _snackBar: MatSnackBar,
        )
    {}

    getReport(file: any): Observable<any> {
        return this.reportService.getReport(file).pipe(
            map((res: any) => {
                console.log(res);
                return res;
            }),
            catchError(err => {
                this._snackBar.open(err.message, '', {
                    duration: 7000,
                     panelClass: 'snack-error'
                    });
                return err;
                 })
            );
    }

}