import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportStore } from './store/report.store';
import { Chart, registerables } from 'chart.js'
import { Store, select } from '@ngrx/store';
import { WeatherService } from './service/weather.service';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, AfterViewInit {
  title = 'studentsReports';
  studentGrades: any = [];
  studentReports: any;
  isExcelLoad: boolean = false;
  loc$: Observable<string>;
  loc!: string;
  currentWeather: any = <any>{};
  msg!: string;

  constructor(
    private reportedStore: ReportStore,
    private store: Store<any>,
    private weatherService: WeatherService,
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  upload(event: any) {
    this.getReport(event.target.files[0]);
  }

  getReport(file: any) {
    this.reportedStore.getReport(file).subscribe((res: any) => {
      this.isExcelLoad = true;
      this.studentGrades = res.calificaciones;
      this.studentReports = res;
      this.graphic();
    });
  }

  shuffle(clave: any, event: any) {
    const rotateNum = event.target.value;
    let claves = this.studentGrades.map((x: any) => x.Clave);
    let index = claves.indexOf(clave);
    if (index != -1) {
      let firsLetter: string;
      let letters: string;
      for (let i = 1; i <= rotateNum; i++) {
        firsLetter = clave.substring(0, 1);
        letters = clave.substring(1, clave.length);
        clave = `${letters}${firsLetter}`;
      }
      this.studentGrades[index].Clave = clave;
    }
  }

  graphic() {
    const names = this.studentGrades.map((x: any) => `${x.Nombres}  ${x.ApellidoPaterno} ${x.ApellidoMaterno} `);
    const grades = this.studentGrades.map((c: any) => c.Calificaciones);
    let element: any = document.getElementById('myChart');
    let ctx: any = element.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: 'Calificaciones de los alumnos',
          data: grades,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  searchWeather(loc: string) {
    loc = "Hermosillo";
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(res => {
        this.currentWeather = res;
      }, err => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      }, () => {
      })
  }

  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
