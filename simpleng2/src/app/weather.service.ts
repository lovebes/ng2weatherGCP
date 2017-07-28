import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class WeatherService {



  irvine_lat = 33.70;
  irvine_lon = -117.74;
  url:string = 'http://history.openweathermap.org/data/2.5/history/city?';


  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error): Observable<any> {
    // note: login fail gives status code. then redirect to login
    // also patient login page will reset the session.
    return Observable.throw(error);
  }
  constructor(private http: Http) {
    this.url = this.url + `lat=${this.irvine_lat}&lon=${this.irvine_lon}`;
  }

  getWeather():Observable<any>{
    return this.http.get(this.url)
      .map(data => {this.extractData(data)})
      .catch(this.handleError);
  }

}
