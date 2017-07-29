import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class WeatherService {


  apiKey = '369c8f930e624316bb202514172907';
  irvine_id =5257570;
  urlHead:string = 'http://api.apixu.com/v1/history.json?';

  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error): Observable<any> {
    // note: login fail gives status code. then redirect to login
    // also patient login page will reset the session.
    return Observable.throw(error);
  }
  constructor(private http: Http) {
  }

  getWeatherOfDate(someDate:Date):Observable<any>{
    let url = this.urlHead;
    let params = {
      key: this.apiKey,
      q: 92620,
      dt: `${someDate.getFullYear()}-${someDate.getMonth()+1}-${someDate.getDate()}`
    }

    url += this.serialize(params);
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  serialize(obj:any){
    let str = "";
    for (let key in obj) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
  }
}
