import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';


const { weatherURL, weatherKey } = environment;

@Injectable({
    providedIn: 'root',
})
export class WeatherService {

    constructor(private http: HttpClient) { }

    getCurrentWeather(loc: string) {
      return this.http.get(`${weatherURL}/weather?q=${loc}&appid=${weatherKey}`)
    }

    getForecast(loc: string) {
      return this.http.get(`${weatherURL}/forecast?q=${loc}&appid=${weatherKey}`)
    }

    getUv(lat: number, lon: number) {
      let startDate = Math.round(+moment(new Date()).subtract(1, 'week').toDate() / 1000);
      let endDate = Math.round(+moment(new Date()).add(1, 'week').toDate() / 1000);
      return this.http.get(`${environment.weatherURL}/uvi/history?lat=${lat}&lon=${lon}&start=${startDate}&end=${endDate}&appid=${weatherKey}`)
    }

}