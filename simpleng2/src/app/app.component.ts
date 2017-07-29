import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./weather.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';

  weatherData:any[] = [];

  constructor(private weatherService: WeatherService){}
  
  ngOnInit(){

    let today = new Date();

    let weatherObsArr:any[] = [1,2,3,4,5,6,7]
      .map(i => {
        let d = new Date();
        return d.setDate(today.getDate() - i);
      })
      .map((date:any) => {
        return this.weatherService.getWeatherOfDate(new Date(date));
      });

    Observable.forkJoin(weatherObsArr)
      .map(rawArr=> {
        return rawArr.map((rawRow:any) => {
          return {
            date: rawRow.forecast.forecastday[0].date,
            avgtemp_c: rawRow.forecast.forecastday[0].day.avgtemp_c
          }
        })
      })
      .subscribe(
        data => {
          this.weatherData = data;
        },
        error => {
        }
      )

  }


}
